import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as consultationService
  from "./consultation.service";

export const startConsultation =
  async (req: AuthRequest, res: Response) => {

  try {

    const consultation =
      await consultationService.startConsultation(
        req.body.patient_id,
        req.user.userId
      );

    res.status(201).json(consultation);

  } catch (error) {

    res.status(500).json({
      message: "Failed to start consultation",
    });
  }
};

export const updateConsultation =
  async (req: Request, res: Response) => {

  try {

    const consultation =
      await consultationService.updateConsultation(
        Number(req.params.id),
        req.body
      );

    res.json(consultation);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update consultation",
    });
  }
};

export const getConsultation =
  async (req: Request, res: Response) => {

  try {

    const consultation =
      await consultationService.getConsultation(
        Number(req.params.id)
      );

    res.json(consultation);

  } catch (error) {

    res.status(500).json({
      message: "Failed to get consultation",
    });
  }
};

export const listConsultations = async (req: AuthRequest, res: Response) => {
  try {
    const consultations = await consultationService.listConsultations(req.user);
    res.json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to list consultations",
    });
  }
};