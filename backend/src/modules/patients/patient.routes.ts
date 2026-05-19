import express from "express";

import {
  createPatient,
  searchPatients,
  getPatientProfile,
} from "./patient.controller";

import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createPatient as any);

router.get("/search", authMiddleware, searchPatients as any);

router.get("/:id", authMiddleware, getPatientProfile as any);

export default router;