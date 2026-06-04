import prisma from "../../config/prisma";

export const getLowStockAlerts = async (limit = 50, offset = 0) => {
  const rows: any = await prisma.$queryRaw`
    SELECT d.drug_id, d.name, IFNULL(SUM(sb.quantity),0) as total_qty, d.reorder_level
    FROM Drug d
    LEFT JOIN StockBatch sb ON sb.drug_id = d.drug_id
    WHERE d.is_active = true
    GROUP BY d.drug_id, d.name, d.reorder_level
    HAVING total_qty > 0 AND total_qty <= d.reorder_level
    ORDER BY (total_qty / d.reorder_level) ASC
    LIMIT ${limit} OFFSET ${offset};
  `;

  return Array.isArray(rows) ? rows : [rows];
};

export const getExpiryAlerts = async (daysThreshold = 30, limit = 50, offset = 0) => {
  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + Number(daysThreshold));

  const rows: any = await prisma.$queryRaw`
    SELECT sb.stock_batch_id, d.drug_id, d.name, sb.batch_number, sb.expiry_date, sb.quantity,
      DATEDIFF(sb.expiry_date, CURDATE()) as days_left
    FROM StockBatch sb
    JOIN Drug d ON d.drug_id = sb.drug_id
    WHERE sb.expiry_date IS NOT NULL
      AND sb.expiry_date BETWEEN ${now} AND ${future}
      AND sb.quantity > 0
    ORDER BY sb.expiry_date ASC
    LIMIT ${limit} OFFSET ${offset};
  `;

  return Array.isArray(rows) ? rows : [rows];
};

export const getOutOfStockAlerts = async (limit = 50, offset = 0) => {
  const rows: any = await prisma.$queryRaw`
    SELECT d.drug_id, d.name, IFNULL(SUM(sb.quantity),0) as total_qty
    FROM Drug d
    LEFT JOIN StockBatch sb ON sb.drug_id = d.drug_id
    WHERE d.is_active = true
    GROUP BY d.drug_id, d.name
    HAVING total_qty = 0
    LIMIT ${limit} OFFSET ${offset};
  `;

  return Array.isArray(rows) ? rows : [rows];
};

export const getDamagedStockAlerts = async (limit = 50, offset = 0) => {
  return prisma.stockBatch.findMany({
    where: { status: "DAMAGED", quantity: { gt: 0 } },
    include: { drug: true },
    orderBy: { created_at: "desc" },
    take: limit,
    skip: offset,
  });
};

export const getNearExpiryByBatch = async (daysThreshold = 30, limit = 50, offset = 0) => {
  return getExpiryAlerts(daysThreshold, limit, offset);
};

export default {
  getLowStockAlerts,
  getExpiryAlerts,
  getOutOfStockAlerts,
  getDamagedStockAlerts,
  getNearExpiryByBatch,
};
