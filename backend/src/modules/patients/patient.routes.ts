import express from "express";

import {
  createPatient,
  searchPatients,
  getPatientProfile,
  addPatientAllergy,
  updatePatient,
  deletePatient,
} from "./patient.controller";

import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createPatient as any);

router.get("/search", authMiddleware, searchPatients as any);

router.post("/:id/allergies", authMiddleware, addPatientAllergy as any);

router.put("/:id", authMiddleware, updatePatient as any);

router.delete("/:id", authMiddleware, deletePatient as any);

router.get("/:id", authMiddleware, getPatientProfile as any);

export default router;