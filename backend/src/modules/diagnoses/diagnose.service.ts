import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const addDiagnosis = async (data: { consultation_id: any; diagnosis_name: any; notes: any; }) => {
  return prisma.diagnosis.create({
    data: {
      consultation_id: data.consultation_id,
      diagnosis_name: data.diagnosis_name,
      notes: data.notes,
    },
  });
};

export const updateDiagnosis = async (
  diagnosisId: number,
  data: { diagnosis_name: any; notes: any; }
) => {
  return prisma.diagnosis.update({
    where: {
      diagnosis_id: diagnosisId,
    },
    data: {
      diagnosis_name: data.diagnosis_name,
      notes: data.notes,
    },
  });
};