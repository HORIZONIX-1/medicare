import prisma from "../../config/prisma";

export const searchPatients = async (
  type: string,
  value: string
) => {

  if (type === "patient_id") {
    return prisma.patient.findMany({
      where: {
        patient_code: {
          contains: value,
        },
      },
    });
  }

  if (type === "nic") {
    return prisma.patient.findMany({
      where: {
        nic: {
          contains: value,
        },
      },
    });
  }

  if (type === "phone") {
    return prisma.patient.findMany({
      where: {
        phone: {
          contains: value,
        },
      },
    });
  }

  return [];
};

export const createPatient = async (
  data: any,
  createdBy: any
) => {

  const {
    guardian_name,
    guardian_phone,
    relationship,
    ...patientData
  } = data;

  const patientCount = await prisma.patient.count();

  const patientCode = `P${String(patientCount + 1).padStart(5, "0")}`;

  const patient = await prisma.patient.create({
    data: {
      patient_code: patientCode,

      name: patientData.name,
      gender: patientData.gender,
      date_of_birth: new Date(patientData.date_of_birth),

      nic: patientData.nic,
      phone: patientData.phone,
      address: patientData.address,

      created_by: createdBy,
    },
  });

  if (guardian_name?.trim()) {
    await prisma.patientGuardian.create({
      data: {
        patient_id: patient.patient_id,
        guardian_name: guardian_name.trim(),
        guardian_phone: guardian_phone?.trim(),
        relationship: relationship?.trim(),
      },
    });
  }

  return patient;
};

export const getPatientProfile = async (
  patientId: number
) => {

  return prisma.patient.findUnique({
    where: {
      patient_id: patientId,
    },

    include: {
      guardians: true,

      allergies: true,

      consultations: {
        orderBy: {
          visit_date: "desc",
        },

        include: {
          doctor: {
            select: {
              name: true,
            },
          },

          prescriptions: true,
        },
      },
    },
  });
};

export const getAllPatients = async () => {
  return prisma.patient.findMany({
    orderBy: {
      created_at: "desc",
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