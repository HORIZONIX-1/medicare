import prisma from "../../config/prisma";

export const getAvailableStock =
  async (drugId: number) => {

  const batches =
    await prisma.stockBatch.findMany({
      where: {
        drug_id: drugId,
      },
    });

  const total =
    batches.reduce(
      (sum, batch) =>
        sum + batch.quantity,
      0
    );

  return total;
};