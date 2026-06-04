import prisma from "../../config/prisma";

const parseCount = (row: any) => {
  if (!row) return 0;
  // MySQL returns { 'COUNT(*)': x } or { count: x }
  return Number(row.count ?? row["COUNT(*)"] ?? 0);
};

export const getTotalDrugCount = async () => {
  return prisma.drug.count({ where: { is_active: true } });
};

export const getInStockCount = async () => {
  const rows: any = await prisma.$queryRaw`
    SELECT COUNT(*) as count
    FROM Drug d
    WHERE (
      SELECT IFNULL(SUM(sb.quantity), 0)
      FROM StockBatch sb
      WHERE sb.drug_id = d.drug_id
    ) > d.reorder_level
    AND d.is_active = true;
  `;

  return parseCount(Array.isArray(rows) ? rows[0] : rows);
};

export const getLowStockCount = async () => {
  const rows: any = await prisma.$queryRaw`
    SELECT COUNT(*) as count
    FROM Drug d
    WHERE (
      SELECT IFNULL(SUM(sb.quantity), 0)
      FROM StockBatch sb
      WHERE sb.drug_id = d.drug_id
    ) > 0
    AND (
      SELECT IFNULL(SUM(sb.quantity), 0)
      FROM StockBatch sb
      WHERE sb.drug_id = d.drug_id
    ) <= d.reorder_level
    AND d.is_active = true;
  `;

  return parseCount(Array.isArray(rows) ? rows[0] : rows);
};

export const getOutOfStockCount = async () => {
  const rows: any = await prisma.$queryRaw`
    SELECT COUNT(*) as count
    FROM Drug d
    WHERE (
      SELECT IFNULL(SUM(sb.quantity), 0)
      FROM StockBatch sb
      WHERE sb.drug_id = d.drug_id
    ) = 0
    AND d.is_active = true;
  `;

  return parseCount(Array.isArray(rows) ? rows[0] : rows);
};

export const getInventoryValue = async () => {
  const rows: any = await prisma.$queryRaw`
    SELECT IFNULL(SUM(sb.quantity * sb.selling_price), 0) as total_value
    FROM StockBatch sb
    WHERE sb.quantity > 0;
  `;

  const row = Array.isArray(rows) ? rows[0] : rows;
  return Number(row?.total_value ?? row?.["SUM(sb.quantity * sb.selling_price)"] ?? 0);
};

export const getAllMetrics = async () => {
  // Run queries in a single transaction for consistency
  const [totalTypes, inStock, lowStock, outOfStock, inventoryValue] = await prisma.$transaction([
    prisma.drug.count({ where: { is_active: true } }),
    prisma.$queryRaw`
      SELECT COUNT(*) as count
      FROM Drug d
      WHERE (
        SELECT IFNULL(SUM(sb.quantity), 0)
        FROM StockBatch sb
        WHERE sb.drug_id = d.drug_id
      ) > d.reorder_level
      AND d.is_active = true;
    `,
    prisma.$queryRaw`
      SELECT COUNT(*) as count
      FROM Drug d
      WHERE (
        SELECT IFNULL(SUM(sb.quantity), 0)
        FROM StockBatch sb
        WHERE sb.drug_id = d.drug_id
      ) > 0
      AND (
        SELECT IFNULL(SUM(sb.quantity), 0)
        FROM StockBatch sb
        WHERE sb.drug_id = d.drug_id
      ) <= d.reorder_level
      AND d.is_active = true;
    `,
    prisma.$queryRaw`
      SELECT COUNT(*) as count
      FROM Drug d
      WHERE (
        SELECT IFNULL(SUM(sb.quantity), 0)
        FROM StockBatch sb
        WHERE sb.drug_id = d.drug_id
      ) = 0
      AND d.is_active = true;
    `,
    prisma.$queryRaw`
      SELECT IFNULL(SUM(sb.quantity * sb.selling_price), 0) as total_value
      FROM StockBatch sb
      WHERE sb.quantity > 0;
    `,
  ] as any);

  return {
    totalTypes,
    inStock: parseCount(Array.isArray(inStock) ? inStock[0] : inStock),
    lowStock: parseCount(Array.isArray(lowStock) ? lowStock[0] : lowStock),
    outOfStock: parseCount(Array.isArray(outOfStock) ? outOfStock[0] : outOfStock),
    inventoryValue: Number((Array.isArray(inventoryValue) ? inventoryValue[0] : inventoryValue)?.total_value ?? 0),
  };
};

export default {
  getTotalDrugCount,
  getInStockCount,
  getLowStockCount,
  getOutOfStockCount,
  getInventoryValue,
  getAllMetrics,
};
