import prisma from '../config/prisma';
jest.mock('../config/prisma');

import * as stockService from '../modules/stock/stock.service';

describe('stock.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('getAvailableStock sums quantities', async () => {
    (prisma.stockBatch.findMany as jest.Mock).mockResolvedValue([{ quantity: 5 }, { quantity: 3 }]);

    const total = await stockService.getAvailableStock(1);
    expect(total).toBe(8);
    expect(prisma.stockBatch.findMany).toHaveBeenCalledWith({ where: { drug_id: 1 } });
  });

  test('createStockBatch validates drug existence and creates batch', async () => {
    (prisma.drug.findUnique as jest.Mock).mockResolvedValue({ drug_id: 1 });
    (prisma.stockBatch.create as jest.Mock).mockResolvedValue({ stock_batch_id: 10, quantity: 5 });

    const data = { drug_id: 1, quantity: 5, buying_price: 10, selling_price: 12 };
    const created = await stockService.createStockBatch(data);
    expect(created).toEqual({ stock_batch_id: 10, quantity: 5 });
  });
});
