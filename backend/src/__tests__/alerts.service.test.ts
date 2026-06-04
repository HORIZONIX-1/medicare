import prisma from '../config/prisma';
jest.mock('../config/prisma');

import * as alertsService from '../modules/dispenser/alerts.service';

describe('alerts.service', () => {
  beforeEach(() => jest.resetAllMocks());

  test('getLowStockAlerts returns rows', async () => {
    const rows = [{ drug_id: 1, name: 'Drug A', total_qty: 2, reorder_level: 5 }];
    (prisma.$queryRaw as jest.Mock).mockResolvedValue(rows);

    const res = await alertsService.getLowStockAlerts(10, 0);
    expect(res).toEqual(rows);
    expect(prisma.$queryRaw).toHaveBeenCalled();
  });
});
