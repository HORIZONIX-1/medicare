import prisma from "../../config/prisma";

export const searchPatients = async (
  type: string,
  value: string,
  currentUser?: { userId: number; role: string }
) => {
  console.log("searchPatients called with:", { type, value, currentUser });
  let organizationId: number | null = null;

  if (currentUser && (currentUser.role === "DOCTOR" || currentUser.role === "RECEPTIONIST")) {
    const user = await prisma.user.findUnique({
      where: { user_id: currentUser.userId },
      select: { organization_id: true }
    });
    organizationId = user?.organization_id ?? null;
    console.log(`Found organizationId for ${currentUser.role}:`, organizationId);
  }

  const where: any = {};

  if (currentUser && (currentUser.role === "DOCTOR" || currentUser.role === "RECEPTIONIST")) {
    where.organization_id = organizationId;
  }

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

  console.log("Final patients query where clause:", where);
  return prisma.patient.findMany({
    where,
  });
};

export const createPatient = async (
  data: { name: any; gender: any; date_of_birth: string | number | Date; nic: any; phone: any; address: any; },
  createdBy: any
) => {
  const patientCount = await prisma.patient.count();
  const patientCode = `P${String(patientCount + 1).padStart(5, "0")}`;

  const creator = await prisma.user.findUnique({
    where: { user_id: createdBy },
    select: { organization_id: true }
  });

  return prisma.patient.create({
    data: {
      patient_code: patientCode,

      name: data.name,
      gender: data.gender,

      date_of_birth: new Date(data.date_of_birth),

      nic: data.nic,
      phone: data.phone,
      address: data.address,

      created_by: createdBy,
      organization_id: creator?.organization_id ?? null,
    },
  });
};

export const getPatientProfile = async (
  patientId: number
) => {

  return prisma.patient.findUnique({
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
  const user = await prisma.user.findUnique({
    where: { user_id: currentUser.userId },
    select: { organization_id: true }
  });

  const patient = await prisma.patient.findUnique({
    where: { patient_id: patientId },
    select: { organization_id: true }
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  if (currentUser.role !== "ADMIN" && patient.organization_id !== user?.organization_id) {
    throw new Error("Unauthorized to update this patient");
  }

  const updateData: any = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.date_of_birth !== undefined) updateData.date_of_birth = new Date(data.date_of_birth);
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
  const user = await prisma.user.findUnique({
    where: { user_id: currentUser.userId },
    select: { organization_id: true }
  });

  const patient = await prisma.patient.findUnique({
    where: { patient_id: patientId },
    select: { 
      organization_id: true, 
      consultations: { select: { consultation_id: true } } 
    }
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  if (currentUser.role !== "ADMIN" && patient.organization_id !== user?.organization_id) {
    throw new Error("Unauthorized to delete this patient");
  }

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