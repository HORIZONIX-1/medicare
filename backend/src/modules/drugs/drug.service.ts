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

export const getDrugAvailability =
  async (drugId: number) => {

  const batches =
    await prisma.stockBatch.findMany({
      where: {
        drug_id: drugId,
      },
    });

  const availableQuantity =
    batches.reduce(
      (sum, batch) =>
        sum + batch.quantity,
      0
    );

  const drug =
    await prisma.drug.findUnique({
      where: {
        drug_id: drugId,
      },
    });

  if (!drug) {
    throw new Error("Drug not found");
  }

  let status = "IN_STOCK";

  if (availableQuantity === 0) {
    status = "OUT_OF_STOCK";
  }
  else if (
    availableQuantity <=
    drug.reorder_level
  ) {
    status = "LOW_STOCK";
  }

  return {

    available_quantity:
      availableQuantity,

    reorder_level:
      drug.reorder_level,

    status,
  };
};