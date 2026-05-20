import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getAllSymptoms =
  async () => {

  return prisma.symptom.findMany();
};

export const createSymptom =
  async (name: string) => {

  return prisma.symptom.create({
    data: { name },
  });
};

export const addConsultationSymptom =
  async (data: { consultation_id: any; symptom_id: any; severity: any; duration_value: any; duration_unit: any; }) => {

  return prisma.consultationSymptom.create({
    data: {

      consultation_id:
        data.consultation_id,

      symptom_id:
        data.symptom_id,

      severity:
        data.severity,

      duration_value:
        data.duration_value,

      duration_unit:
        data.duration_unit,
    },
  });
};