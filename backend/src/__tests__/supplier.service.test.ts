jest.mock('../config/prisma', () => ({
  __esModule: true,
  default: {
    supplier: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn((queries: any[]) => Promise.all(queries)),
  },
}));

import prisma from '../config/prisma';

import * as supplierService from '../modules/dispenser/supplier.service';

describe('supplier.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (prisma.$transaction as jest.Mock).mockImplementation((queries: any[]) => Promise.all(queries));
  });

  test('createSupplier delegates to prisma', async () => {
    const supplier = { supplier_id: 1, name: 'Acme' };
    (prisma.supplier.create as jest.Mock).mockResolvedValue(supplier);

    const res = await supplierService.createSupplier({ name: 'Acme' });
    expect(res).toEqual(supplier);
  });

  test('listSuppliers returns paginated result', async () => {
    (prisma.supplier.findMany as jest.Mock).mockResolvedValue([{ supplier_id: 1, name: 'S' }]);
    (prisma.supplier.count as jest.Mock).mockResolvedValue(1);

    const res = await supplierService.listSuppliers({ page: 1, limit: 10 });
    expect(res.meta.total).toBe(1);
    expect(res.data.length).toBe(1);
  });
});
