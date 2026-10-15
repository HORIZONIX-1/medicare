import type { Prisma } from "../../generated/prisma";

export class InsufficientStockError extends Error {
  statusCode = 400;
}

// Batches that can actually be dispensed: active, in stock, and not yet expired,
// ordered first-expiry-first-out.
export const getUsableBatches = (
  tx: Prisma.TransactionClient,
  drugId: number
) =>
  tx.stockBatch.findMany({
    where: {
      drug_id: drugId,
      status: "ACTIVE",
      quantity: { gt: 0 },
      OR: [
        { expiry_date: null },
        { expiry_date: { gt: new Date() } },
      ],
    },
    orderBy: [
      { expiry_date: "asc" },
      { created_at: "asc" },
    ],
  });

export const assertStockAvailable = async (
  tx: Prisma.TransactionClient,
  drugId: number,
  quantity: number,
  drugName: string
) => {
  const batches = await getUsableBatches(tx, drugId);
  const available = batches.reduce((sum, batch) => sum + batch.quantity, 0);

  if (available < quantity) {
    throw new InsufficientStockError(
      `Insufficient stock for ${drugName}: requested ${quantity}, available ${available}`
    );
  }

  return batches;
};

// Deducts `quantity` units across as many batches as needed (FEFO) and records
// each batch movement in the audit log so stock reports see the dispense.
export const deductStock = async (
  tx: Prisma.TransactionClient,
  drugId: number,
  quantity: number,
  drugName: string,
  actorUserId?: number | null
) => {
  const batches = await assertStockAvailable(tx, drugId, quantity, drugName);
  let remaining = quantity;

  for (const batch of batches) {
    if (remaining <= 0) break;

    const take = Math.min(batch.quantity, remaining);

    await tx.stockBatch.update({
      where: { stock_batch_id: batch.stock_batch_id },
      data: { quantity: { decrement: take } },
    });

    await tx.auditLog.create({
      data: {
        actor_user_id: actorUserId ?? null,
        action: "DISPENSE",
        entity: "StockBatch",
        entity_id: String(batch.stock_batch_id),
        metadata: {
          drugId,
          drugName,
          quantity: take,
          before: batch.quantity,
          after: batch.quantity - take,
        },
      },
    });

    remaining -= take;
  }
};
