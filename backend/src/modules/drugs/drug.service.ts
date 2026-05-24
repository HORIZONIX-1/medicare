import prisma from "../../config/prisma";

export const createDrug =
  async (data: any) => {

  return prisma.drug.create({
    data: {

      name: data.name,

      category: data.category,

      unit_type: data.unit_type,

      dosage_type: data.dosage_type,

      selling_price: data.selling_price,

      reorder_level: data.reorder_level,
    },
  });
};

export const searchDrugs =
  async (query: string) => {

  return prisma.drug.findMany({
    where: {
      name: {
        contains: query,
      },

      is_active: true,
    },

    take: 10,
  });
};

export const getDrugById =
  async (drugId: number) => {

  return prisma.drug.findUnique({
    where: {
      drug_id: drugId,
    },
  });
};