import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const addInvestigation =
  async (data: { consultation_id: any; title: any; description: any; }) => {

  return prisma.investigation.create({
    data: {

      consultation_id:
        data.consultation_id,

      title:
        data.title,

      description:
        data.description,
    },
  });
};

export const updateInvestigation =
  async (investigationId: number, data: { title: any; description: any; }) => {

  return prisma.investigation.update({
    where: {
      investigation_id: investigationId,
    },
    data: {
      title: data.title,
      description: data.description,
    },
  });
};