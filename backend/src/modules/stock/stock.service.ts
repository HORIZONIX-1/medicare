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

export const createStockBatch =
  async (data: any) => {

  const drugId = Number(data.drug_id);
  const quantity = Number(data.quantity);
  const buyingPrice = Number(data.buying_price);
  const sellingPrice = Number(data.selling_price);

  if (!drugId || !Number.isFinite(quantity) || quantity <= 0) {
    throw new Error("drug_id and quantity are required");
  }

  if (!Number.isFinite(buyingPrice) || buyingPrice < 0) {
    throw new Error("buying_price is required");
  }

  if (!Number.isFinite(sellingPrice) || sellingPrice < 0) {
    throw new Error("selling_price is required");
  }

  const drug = await prisma.drug.findUnique({
    where: {
      drug_id: drugId,
    },
  });

  if (!drug) {
    throw new Error("Drug not found");
  }

  return prisma.stockBatch.create({
    data: {
      drug_id: drugId,
      batch_number: data.batch_number || null,
      expiry_date: data.expiry_date ? new Date(data.expiry_date) : null,
      quantity,
      buying_price: buyingPrice,
      selling_price: sellingPrice,
    },
    include: {
      drug: true,
    },
  });
};