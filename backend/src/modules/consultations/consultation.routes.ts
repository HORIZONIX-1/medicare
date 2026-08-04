import express, { Request, Response } from "express";

import {
  startConsultation,
  updateConsultation,
  getConsultation,
  listConsultations,
} from "./consultation.controller";

import { authMiddleware }
  from "../../middleware/auth.middleware";

import { roleMiddleware }
  from "../../middleware/role.middleware";

const router = express.Router();

router.post(
  "/start",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  startConsultation as any
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  listConsultations as any
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  updateConsultation as any
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  getConsultation as any
);

export default router;