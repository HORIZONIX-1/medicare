import prisma from "../../config/prisma";

export const createSupplier = async (data: any) => {
  return prisma.supplier.create({ data });
};

export const updateSupplier = async (id: number, data: any) => {
  return prisma.supplier.update({ where: { supplier_id: id }, data });
};

export const getSupplierById = async (id: number) => {
  return prisma.supplier.findUnique({ where: { supplier_id: id } });
};

export const listSuppliers = async (opts: any = {}) => {
  const page = Math.max(1, Number(opts.page || 1));
  const limit = Math.min(100, Number(opts.limit || 25));
  const skip = (page - 1) * limit;

  const [items, total] = await prisma.$transaction([
    prisma.supplier.findMany({ where: { is_active: true }, skip, take: limit, orderBy: { created_at: "desc" } }),
    prisma.supplier.count({ where: { is_active: true } }),
  ]);

  return { data: items, meta: { page, limit, total } };
};

export const deleteSupplier = async (id: number) => {
  return prisma.supplier.update({ where: { supplier_id: id }, data: { is_active: false } });
};

export default { createSupplier, updateSupplier, getSupplierById, listSuppliers, deleteSupplier };
