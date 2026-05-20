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