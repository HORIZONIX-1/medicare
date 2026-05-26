import { Request, Response } from "express";
import * as prescriptionService
  from "./prescription.service";

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

    res.json(prescription);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to get prescription",
    });
  }
};