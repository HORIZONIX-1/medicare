import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as consultationService
  from "./consultation.service";

export const startConsultation =
  async (req: AuthRequest, res: Response) => {

  const patientId = Number(req.body?.patient_id);

  if (!Number.isInteger(patientId) || patientId <= 0) {
    return res.status(400).json({
      message: "A valid patient_id is required",
    });
  }

  try {

    const consultation =
      await consultationService.startConsultation(
        patientId,
        req.user.userId
      );

    res.status(201).json(consultation);

  } catch (error) {

    if ((error as { code?: string })?.code === "P2003") {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    console.error(error);

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

    if ((error as { code?: string })?.code === "P2025") {
      return res.status(404).json({
        message: "Consultation not found",
      });
    }

    console.error(error);

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

    if (!consultation) {
      return res.status(404).json({
        message: "Consultation not found",
      });
    }

    res.json(consultation);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to get consultation",
    });
  }
};

export const getDashboardSummary = async (req: AuthRequest, res: Response) => {
  try {
    const summary = await consultationService.getDashboardSummary(req.user);
    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to load dashboard summary",
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