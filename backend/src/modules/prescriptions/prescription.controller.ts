import { Request, Response } from "express";
import * as prescriptionService
  from "./prescription.service";
import { InsufficientStockError } from "../stock/stock.allocation";

export const createPrescription =
  async (req: Request, res: Response) => {

  try {

    const prescription =
      await prescriptionService
        .createPrescription(req.body);

    res.status(201).json(
      prescription
    );

  } catch (error) {

    if (
      error instanceof prescriptionService.PrescriptionError ||
      error instanceof InsufficientStockError
    ) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    console.error(error);

    res.status(500).json({
      message:
        "Failed to create prescription",
    });
  }
};

export const getPrescription =
  async (req: Request, res: Response) => {

  try {

    const prescription =
      await prescriptionService
        .getPrescription(
          Number(req.params.id)
        );

    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    res.json(prescription);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to get prescription",
    });
  }
};

export const listPrescriptions = async (req: any, res: Response) => {
  try {
    const prescriptions = await prescriptionService.listPrescriptions(req.user);
    res.json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get prescriptions list",
    });
  }
};