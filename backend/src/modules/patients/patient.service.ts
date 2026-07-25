import prisma from "../../config/prisma";

export const searchPatients = async (
  type: string,
  value: string,
  currentUser?: { userId: number; role: string }
) => {
  console.log("searchPatients called with:", { type, value, currentUser });
  let organizationId: number | null = null;

  if (currentUser && currentUser.role === "DOCTOR") {
    const user = await prisma.user.findUnique({
      where: { user_id: currentUser.userId },
      select: { organization_id: true }
    });
    organizationId = user?.organization_id ?? null;
    console.log("Found organizationId for doctor:", organizationId);
  }

  const where: any = {};

  if (currentUser && currentUser.role === "DOCTOR") {
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