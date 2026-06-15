import prisma from "../../config/prisma";

// Safe audit logger from admin module
const { createAuditLogSafe } = require("../admin/audit/audit.service");

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
      status: data.status || undefined,
      warehouse_location: data.warehouse_location || null,
      supplier_id: data.supplier_id || null,
    },
    include: {
      drug: true,
    },
  });
};

export const getStockBatchesByDrug = async (drugId: number, options: any = {}) => {
  const where: any = { drug_id: drugId };

  if (options.status) where.status = options.status;
  if (options.excludeZeroQuantity) where.quantity = { gt: 0 };

  return prisma.stockBatch.findMany({
    where,
    orderBy: options.orderBy || { expiry_date: "asc" },
    take: options.limit || undefined,
    skip: options.offset || undefined,
  });
};

export const getStockList = async (filters: any = {}) => {
  const where: any = {};

  if (filters.drugId) where.drug_id = Number(filters.drugId);
  if (filters.status) where.status = filters.status;
  if (filters.supplierId) where.supplier_id = Number(filters.supplierId);
  if (filters.expiryBefore || filters.expiryAfter) {
    where.expiry_date = {};
    if (filters.expiryBefore) where.expiry_date.lte = new Date(filters.expiryBefore);
    if (filters.expiryAfter) where.expiry_date.gte = new Date(filters.expiryAfter);
  }

  const page = Math.max(1, Number(filters.page || 1));
  const limit = Math.min(100, Number(filters.limit || 25));
  const skip = (page - 1) * limit;

  const [items, total] = await prisma.$transaction([
    prisma.stockBatch.findMany({ where, skip, take: limit, orderBy: { created_at: "desc" }, include: { drug: true } }),
    prisma.stockBatch.count({ where }),
  ]);

  return { data: items, meta: { page, limit, total } };
};

export const getStockById = async (batchId: number) => {
  return prisma.stockBatch.findUnique({ where: { stock_batch_id: batchId }, include: { drug: true } });
};

export const updateStockBatch = async (batchId: number, data: any, actorUserId?: number, req?: any) => {
  const updateData: any = {};
  if (data.batch_number !== undefined) updateData.batch_number = data.batch_number;
  if (data.expiry_date !== undefined) updateData.expiry_date = data.expiry_date ? new Date(data.expiry_date) : null;
  if (data.quantity !== undefined) updateData.quantity = Number(data.quantity);
  if (data.buying_price !== undefined) updateData.buying_price = Number(data.buying_price);
  if (data.selling_price !== undefined) updateData.selling_price = Number(data.selling_price);
  if (data.status !== undefined) updateData.status = data.status;
  if (data.warehouse_location !== undefined) updateData.warehouse_location = data.warehouse_location;
  if (data.supplier_id !== undefined) updateData.supplier_id = data.supplier_id;

  const updated = await prisma.stockBatch.update({ where: { stock_batch_id: batchId }, data: updateData });

  // Audit log (non-blocking)
  try {
    createAuditLogSafe({ actorUserId, action: "UPDATE", entity: "StockBatch", entityId: batchId, metadata: { updated: updateData }, req });
  } catch (e) {
    // swallow
  }

  return updated;
};

export const deleteStockBatch = async (batchId: number, actorUserId?: number, req?: any) => {
  const deleted = await prisma.stockBatch.delete({ where: { stock_batch_id: batchId } });

  createAuditLogSafe({ actorUserId, action: "DELETE", entity: "StockBatch", entityId: batchId, metadata: null, req });

  return deleted;
};

export const adjustStockBatch = async (batchId: number, adjustmentType: "ADD" | "REMOVE", quantity: number, reason?: string, actorUserId?: number, req?: any) => {
  if (!Number.isFinite(quantity) || quantity <= 0) throw new Error("quantity must be a positive number");

  return prisma.$transaction(async (tx) => {
    const batch = await tx.stockBatch.findUnique({ where: { stock_batch_id: batchId } });
    if (!batch) throw new Error("Stock batch not found");

    const newQty = adjustmentType === "ADD" ? batch.quantity + quantity : batch.quantity - quantity;
    if (newQty < 0) throw new Error("Insufficient quantity in batch");

    const updated = await tx.stockBatch.update({ where: { stock_batch_id: batchId }, data: { quantity: newQty } });

    createAuditLogSafe({ actorUserId, action: "ADJUST_STOCK", entity: "StockBatch", entityId: batchId, metadata: { adjustmentType, quantity, reason, before: batch.quantity, after: newQty }, req });

    return updated;
  });
};

export const transferStock = async (fromBatchId: number, toBatchId: number, quantity: number, actorUserId?: number, req?: any) => {
  if (!Number.isFinite(quantity) || quantity <= 0) throw new Error("quantity must be a positive number");

  return prisma.$transaction(async (tx) => {
    const from = await tx.stockBatch.findUnique({ where: { stock_batch_id: fromBatchId } });
    const to = await tx.stockBatch.findUnique({ where: { stock_batch_id: toBatchId } });

    if (!from || !to) throw new Error("Source or destination batch not found");
    if (from.drug_id !== to.drug_id) throw new Error("Batches belong to different drugs");
    if (from.quantity < quantity) throw new Error("Insufficient quantity in source batch");

    const updatedFrom = await tx.stockBatch.update({ where: { stock_batch_id: fromBatchId }, data: { quantity: from.quantity - quantity } });
    const updatedTo = await tx.stockBatch.update({ where: { stock_batch_id: toBatchId }, data: { quantity: to.quantity + quantity } });

    createAuditLogSafe({ actorUserId, action: "TRANSFER_STOCK", entity: "StockBatch", entityId: fromBatchId, metadata: { toBatchId, quantity, beforeFrom: from.quantity, afterFrom: updatedFrom.quantity, beforeTo: to.quantity, afterTo: updatedTo.quantity }, req });

    return { from: updatedFrom, to: updatedTo };
  });
};

export const bulkUpdatePrices = async (updates: Array<any>, actorUserId?: number, req?: any) => {
  return prisma.$transaction(async (tx) => {
    const results = [] as any[];
    for (const u of updates) {
      const updated = await tx.stockBatch.update({ where: { stock_batch_id: Number(u.batchId) }, data: { buying_price: u.buyingPrice ?? undefined, selling_price: u.sellingPrice ?? undefined } });
      results.push(updated);
      createAuditLogSafe({ actorUserId, action: "UPDATE_PRICE", entity: "StockBatch", entityId: updated.stock_batch_id, metadata: { buying_price: updated.buying_price, selling_price: updated.selling_price }, req });
    }

    return results;
  });
};

export const getStockValue = async () => {
  const rows: any = await prisma.$queryRaw`
    SELECT IFNULL(SUM(quantity * selling_price),0) as total_value FROM StockBatch WHERE quantity > 0;
  `;

  const row = Array.isArray(rows) ? rows[0] : rows;
  return Number(row?.total_value ?? 0);
};