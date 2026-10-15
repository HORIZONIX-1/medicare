import prisma from "../../config/prisma";

export class PatientError extends Error {
  constructor(message: string, public statusCode = 400) {
    super(message);
  }
}

const getUserOrganizationId = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
    select: { organization_id: true },
  });
  return user?.organization_id ?? null;
};

// Non-admin staff may only access patients that belong to their own organization
const assertPatientAccess = async (
  patientOrganizationId: number | null,
  currentUser?: { userId: number; role: string }
) => {
  if (!currentUser || currentUser.role === "ADMIN") return;

  const organizationId = await getUserOrganizationId(currentUser.userId);

  if (patientOrganizationId !== organizationId) {
    throw new PatientError("You do not have access to this patient", 403);
  }
};

const generatePatientCode = async () => {
  // Based on the highest existing code (not the row count) so deletions never cause collisions
  const latest = await prisma.patient.findFirst({
    orderBy: { patient_id: "desc" },
    select: { patient_id: true, patient_code: true },
  });
  const fromCode = Number(latest?.patient_code?.replace(/\D/g, "")) || 0;
  const next = Math.max(fromCode, latest?.patient_id ?? 0) + 1;
  return `P${String(next).padStart(5, "0")}`;
};

export const searchPatients = async (
  type: string,
  value: string,
  currentUser?: { userId: number; role: string }
) => {
  let organizationId: number | null = null;

  if (currentUser && (currentUser.role === "DOCTOR" || currentUser.role === "RECEPTIONIST")) {
    const user = await prisma.user.findUnique({
      where: { user_id: currentUser.userId },
      select: { organization_id: true }
    });
    organizationId = user?.organization_id ?? null;
  }

  const where: any = {};

  if (currentUser && (currentUser.role === "DOCTOR" || currentUser.role === "RECEPTIONIST")) {
    where.organization_id = organizationId;
  }

  // An empty value intentionally lists every patient in scope (used by list views)
  value = String(value ?? "").trim();

  if (type === "patient_id") {
    where.patient_code = {
      contains: value,
    };
  } else if (type === "nic") {
    where.nic = {
      contains: value,
    };
  } else if (type === "phone") {
    where.phone = {
      contains: value,
    };
  } else {
    return [];
  }

  return prisma.patient.findMany({
    where,
  });
};

export const createPatient = async (
  data: { name: any; gender: any; date_of_birth: string | number | Date; nic: any; phone: any; address: any; },
  createdBy: any
) => {
  if (!data?.name || !String(data.name).trim()) {
    throw new PatientError("Patient name is required");
  }
  if (!data.gender) {
    throw new PatientError("Gender is required");
  }
  const dateOfBirth = new Date(data.date_of_birth);
  if (!data.date_of_birth || Number.isNaN(dateOfBirth.getTime())) {
    throw new PatientError("A valid date of birth is required");
  }
  if (dateOfBirth.getTime() > Date.now()) {
    throw new PatientError("Date of birth cannot be in the future");
  }

  const creator = await prisma.user.findUnique({
    where: { user_id: createdBy },
    select: { organization_id: true }
  });

  // Retry if another registration grabbed the same code concurrently
  for (let attempt = 0; ; attempt++) {
    try {
      return await prisma.patient.create({
        data: {
          patient_code: await generatePatientCode(),

          name: String(data.name).trim(),
          gender: data.gender,

          date_of_birth: dateOfBirth,

          nic: data.nic || null,
          phone: data.phone || null,
          address: data.address || null,

          created_by: createdBy,
          organization_id: creator?.organization_id ?? null,
        },
      });
    } catch (error) {
      if ((error as { code?: string })?.code !== "P2002" || attempt >= 4) {
        throw error;
      }
    }
  }
};

export const getPatientProfile = async (
  patientId: number,
  currentUser?: { userId: number; role: string }
) => {

  const profile = await prisma.patient.findUnique({
    where: {
      patient_id: patientId,
    },

    include: {
      allergies: true,

      consultations: {
        orderBy: {
          visit_date: "desc",
        },

        include: {
          prescriptions: true,
        },
      },
    },
  });

  if (profile) {
    await assertPatientAccess(profile.organization_id, currentUser);
  }

  return profile;
};

export const addPatientAllergy = async (
  patientId: number,
  allergyName: string
) => {

  const normalizedAllergyName = allergyName.trim();

  const existingAllergy =
    await prisma.patientAllergy.findFirst({
      where: {
        patient_id: patientId,
        allergy_name: normalizedAllergyName,
      },
    });

  if (existingAllergy) {
    return existingAllergy;
  }

  return prisma.patientAllergy.create({
    data: {
      patient_id: patientId,
      allergy_name: normalizedAllergyName,
    },
  });
};

export const updatePatient = async (
  patientId: number,
  data: { name?: string; gender?: string; date_of_birth?: string | Date; nic?: string; phone?: string; address?: string },
  currentUser: { userId: number; role: string }
) => {
  const patient = await prisma.patient.findUnique({
    where: { patient_id: patientId },
    select: { organization_id: true }
  });

  if (!patient) {
    throw new PatientError("Patient not found", 404);
  }

  await assertPatientAccess(patient.organization_id, currentUser);

  const updateData: any = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.date_of_birth !== undefined) {
    const dateOfBirth = new Date(data.date_of_birth);
    if (Number.isNaN(dateOfBirth.getTime())) {
      throw new PatientError("A valid date of birth is required");
    }
    updateData.date_of_birth = dateOfBirth;
  }
  if (data.nic !== undefined) updateData.nic = data.nic;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.address !== undefined) updateData.address = data.address;

  return prisma.patient.update({
    where: { patient_id: patientId },
    data: updateData
  });
};

export const deletePatient = async (
  patientId: number,
  currentUser: { userId: number; role: string }
) => {
  const patient = await prisma.patient.findUnique({
    where: { patient_id: patientId },
    select: { 
      organization_id: true, 
      consultations: { select: { consultation_id: true } } 
    }
  });

  if (!patient) {
    throw new PatientError("Patient not found", 404);
  }

  await assertPatientAccess(patient.organization_id, currentUser);

  const consultationIds = patient.consultations.map(c => c.consultation_id);

  return prisma.$transaction(async (tx) => {
    if (consultationIds.length > 0) {
      // Delete invoices
      await tx.invoice.deleteMany({
        where: { consultation_id: { in: consultationIds } }
      });

      // Delete prescription items
      const prescriptions = await tx.prescription.findMany({
        where: { consultation_id: { in: consultationIds } },
        select: { prescription_id: true }
      });
      const rxIds = prescriptions.map(r => r.prescription_id);
      if (rxIds.length > 0) {
        await tx.prescriptionItem.deleteMany({
          where: { prescription_id: { in: rxIds } }
        });
      }

      // Delete prescriptions
      await tx.prescription.deleteMany({
        where: { consultation_id: { in: consultationIds } }
      });

      // Delete outside drugs
      await tx.outsideDrug.deleteMany({
        where: { consultation_id: { in: consultationIds } }
      });

      // Delete other cascading consultations records
      await tx.examination.deleteMany({
        where: { consultation_id: { in: consultationIds } }
      });
      await tx.consultationSymptom.deleteMany({
        where: { consultation_id: { in: consultationIds } }
      });
      await tx.investigation.deleteMany({
        where: { consultation_id: { in: consultationIds } }
      });
      await tx.patientInstruction.deleteMany({
        where: { consultation_id: { in: consultationIds } }
      });
      await tx.diagnosis.deleteMany({
        where: { consultation_id: { in: consultationIds } }
      });

      // Delete consultations
      await tx.consultation.deleteMany({
        where: { consultation_id: { in: consultationIds } }
      });
    }

    // Delete patient allergies
    await tx.patientAllergy.deleteMany({
      where: { patient_id: patientId }
    });

    // Delete patient guardians
    await tx.patientGuardian.deleteMany({
      where: { patient_id: patientId }
    });

    // Delete patient
    return tx.patient.delete({
      where: { patient_id: patientId }
    });
  });
};