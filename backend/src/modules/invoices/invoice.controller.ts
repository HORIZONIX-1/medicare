import * as invoiceService
  from "./invoice.service";
import { Request, Response } from 'express';
import { InsufficientStockError } from "../stock/stock.allocation";

const sendKnownError = (error: unknown, res: Response) => {
  if (
    error instanceof invoiceService.InvoiceError ||
    error instanceof InsufficientStockError
  ) {
    res.status(error.statusCode).json({ message: error.message });
    return true;
  }
  return false;
};

export const createInvoice =
  async (req: Request, res: Response) => {

  try {

    const invoice =
      await invoiceService
        .createInvoice(req.body);

    res.status(201).json(invoice);

  } catch (error) {

    if (sendKnownError(error, res)) return;

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
          Number(req.params.id),
          (req as any).user?.userId
        );

    res.json(invoice);

  } catch (error) {

    if (sendKnownError(error, res)) return;

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

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to get invoice",
    });
  }
};

export const listInvoices = async (req: any, res: Response) => {
  try {
    const invoices = await invoiceService.listInvoices(req.user);
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to list invoices",
    });
  }
};