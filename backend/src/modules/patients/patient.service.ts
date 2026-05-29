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
  data: { name: any; gender: any; date_of_birth: string | number | Date; nic: any; phone: any; address: any; },
  createdBy: any
) => {

  const patientCount =
    await prisma.patient.count();

  const patientCode =
    `P${String(patientCount + 1).padStart(5, "0")}`;

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