import express from "express";

import { Request, Response, NextFunction } from "express";
import * as symptomService from "./symptom.service";

const createSymptom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      res.status(400).json({ message: "Symptom name is required and must be a non-empty string" });
      return;
    }

    const symptom = await symptomService.createSymptom(name.trim());
    res.status(201).json(symptom);
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(409).json({ message: "Symptom with this name already exists" });
    } else {
      res.status(500).json({ message: "Failed to create symptom" });
    }
  }
};

const addConsultationSymptom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { consultation_id, symptom_id, severity, duration_value, duration_unit } = req.body;

    if (!consultation_id || !symptom_id) {
      res.status(400).json({ message: "consultation_id and symptom_id are required" });
      return;
    }

    const consultationSymptom = await symptomService.addConsultationSymptom({
      consultation_id,
      symptom_id,
      severity: severity ?? null,
      duration_value: duration_value ?? null,
      duration_unit: duration_unit ?? null,
    });

    res.status(201).json(consultationSymptom);
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Consultation or symptom not found" });
    } else {
      res.status(500).json({ message: "Failed to add symptom to consultation" });
    }
  }
};

const router = express.Router();

router.post("/", createSymptom);

router.post(
  "/consultation",
  addConsultationSymptom
);

export default router;