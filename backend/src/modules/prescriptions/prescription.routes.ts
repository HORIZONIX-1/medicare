import express from "express";

import {
  createPrescription,
  getPrescription,
  listPrescriptions,
} from "./prescription.controller";

import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createPrescription);

router.get("/", authMiddleware, listPrescriptions);

router.get("/:id", authMiddleware, getPrescription);

export default router;