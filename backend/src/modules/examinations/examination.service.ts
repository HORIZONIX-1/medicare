import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const addExamination = async (data: { consultation_id: any; title: any; result: any; }) => {
  return prisma.examination.create({
    data: {
      consultation_id: data.consultation_id,
      title: data.title,
      result: data.result,
    },
  });
};