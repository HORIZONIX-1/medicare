jest.mock('../config/prisma', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn(),
    $queryRaw: jest.fn(),
    auditLog: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
    drug: {
      count: jest.fn(),
    },
    stockBatch: {
      count: jest.fn(),
    },
  },
}));

import prisma from '../config/prisma';

import * as reportsService from '../modules/dispenser/reports.service';

describe('reports.service', () => {
  beforeEach(() => jest.resetAllMocks());

  test('getInventorySummary aggregates values', async () => {
    (prisma.$transaction as jest.Mock).mockResolvedValue([5, 10, [{ total_qty: 100 }], [{ total_value: 1000 }]]);

    const res = await reportsService.getInventorySummary();
    expect(res.totalDrugs).toBe(5);
    expect(res.totalBatches).toBe(10);
    expect(res.totalQuantity).toBe(100);
    expect(res.totalValue).toBe(1000);
  });
});
