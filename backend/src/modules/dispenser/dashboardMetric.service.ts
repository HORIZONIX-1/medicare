import prisma from "../../config/prisma";

export const setMetric = async (key: string, value: string, ttlSeconds?: number) => {
  const now = new Date();
  const expiresAt = ttlSeconds ? new Date(now.getTime() + ttlSeconds * 1000) : null;

  return prisma.dashboardMetric.upsert({
    where: { metric_key: key },
    update: { metric_value: value, calculated_at: now, expires_at: expiresAt },
    create: { metric_key: key, metric_value: value, calculated_at: now, expires_at: expiresAt },
  });
};

export const getMetric = async (key: string) => {
  return prisma.dashboardMetric.findUnique({ where: { metric_key: key } });
};

export const listMetrics = async () => {
  return prisma.dashboardMetric.findMany({ orderBy: { calculated_at: "desc" } });
};

export default { setMetric, getMetric, listMetrics };
