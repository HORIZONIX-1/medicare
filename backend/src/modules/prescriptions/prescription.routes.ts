import express from "express";

import {
  createPrescription,
  getPrescription,
} from "./prescription.controller";

const router = express.Router();

router.post("/", createPrescription);

router.get("/:id", getPrescription);

export default router;