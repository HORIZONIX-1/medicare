import * as invoiceService
  from "./invoice.service";
import { Request, Response } from 'express';

export const createInvoice =
  async (req: Request, res: Response) => {

  try {

    const invoice =
      await invoiceService
        .createInvoice(req.body);

    res.status(201).json(invoice);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to create invoice",
    });
  }
};

export const finalizeInvoice =
  async (req: Request, res: Response) => {

  try {

    const invoice =
      await invoiceService
        .finalizeInvoice(
          Number(req.params.id)
        );

    res.json(invoice);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to finalize invoice",
    });
  }
};

export const getInvoice =
  async (req: Request, res: Response) => {

  try {

    const invoice =
      await invoiceService
        .getInvoice(
          Number(req.params.id)
        );

    res.json(invoice);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to get invoice",
    });
  }
};