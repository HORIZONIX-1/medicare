import prisma from "../../config/prisma";

export const getInventorySummary = async () => {
  const [totalDrugs, totalBatches, totalQuantity, totalValue] = await prisma.$transaction([
    prisma.drug.count({ where: { is_active: true } }),
    prisma.stockBatch.count(),
    prisma.$queryRaw`SELECT IFNULL(SUM(quantity),0) as total_qty FROM StockBatch`,
    prisma.$queryRaw`SELECT IFNULL(SUM(quantity * selling_price),0) as total_value FROM StockBatch`,
  ] as any);

  const qtyRow = Array.isArray(totalQuantity) ? totalQuantity[0] : totalQuantity;
  const valRow = Array.isArray(totalValue) ? totalValue[0] : totalValue;

  return {
    totalDrugs,
    totalBatches,
    totalQuantity: Number(qtyRow?.total_qty ?? 0),
    totalValue: Number(valRow?.total_value ?? 0),
  };
};

export const getStockMovementReport = async (dateFrom?: string, dateTo?: string, limit = 100, offset = 0) => {
  const where: any = { entity: "StockBatch" };
  if (dateFrom || dateTo) where.created_at = {};
  if (dateFrom) where.created_at.gte = new Date(dateFrom);
  if (dateTo) where.created_at.lte = new Date(dateTo);

  const [logs, total] = await prisma.$transaction([
    prisma.auditLog.findMany({ where, orderBy: { created_at: "desc" }, take: limit, skip: offset }),
    prisma.auditLog.count({ where }),
  ]);

  return { data: logs, meta: { total, limit, offset } };
};

export const getValueReport = async () => {
  const rows: any = await prisma.$queryRaw`
    SELECT d.category, IFNULL(SUM(sb.quantity * sb.selling_price),0) as value
    FROM Drug d
    JOIN StockBatch sb ON sb.drug_id = d.drug_id
    GROUP BY d.category
    ORDER BY value DESC;
  `;

  return Array.isArray(rows) ? rows : [rows];
};

export const getExpiryForecast = async (months = 6) => {
  const rows: any = await prisma.$queryRaw`
    SELECT DATE_FORMAT(sb.expiry_date, '%Y-%m') as month, IFNULL(SUM(sb.quantity),0) as qty
    FROM StockBatch sb
    WHERE sb.expiry_date IS NOT NULL
      AND sb.expiry_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ${months} MONTH)
    GROUP BY month
    ORDER BY month;
  `;

  return Array.isArray(rows) ? rows : [rows];
};

export const getSupplierPerformance = async () => {
  const rows: any = await prisma.$queryRaw`
    SELECT s.supplier_id, s.name, COUNT(sb.stock_batch_id) as batches, IFNULL(SUM(sb.quantity),0) as total_qty
    FROM Supplier s
    LEFT JOIN StockBatch sb ON sb.supplier_id = s.supplier_id
    GROUP BY s.supplier_id, s.name
    ORDER BY total_qty DESC;
  `;

  return Array.isArray(rows) ? rows : [rows];
};

export default {
  getInventorySummary,
  getStockMovementReport,
  getValueReport,
  getExpiryForecast,
  getSupplierPerformance,
};
