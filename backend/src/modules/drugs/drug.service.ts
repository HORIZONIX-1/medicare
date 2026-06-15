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

export const listDrugs = async (opts: any = {}) => {
  const page = Math.max(1, Number(opts.page || 1));
  const limit = Math.min(100, Number(opts.limit || 25));
  const skip = (page - 1) * limit;

  const where: any = { is_active: true };

  if (opts.category && opts.category !== "All Categories") {
    where.category = opts.category;
  }

  if (opts.search) {
    where.OR = [
      { name: { contains: opts.search } },
      { category: { contains: opts.search } }
    ];
  }

  const [items, total] = await prisma.$transaction([
    prisma.drug.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" }
    }),
    prisma.drug.count({ where })
  ]);

  return { data: items, meta: { page, limit, total } };
};

export const updateDrug = async (id: number, data: any) => {
  return prisma.drug.update({
    where: { drug_id: id },
    data: {
      name: data.name,
      category: data.category,
      unit_type: data.unit_type,
      dosage_type: data.dosage_type,
      selling_price: Number(data.selling_price),
      reorder_level: Number(data.reorder_level)
    }
  });
};

export const deleteDrug = async (id: number) => {
  return prisma.drug.update({
    where: { drug_id: id },
    data: { is_active: false }
  });
};