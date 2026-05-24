import express, { RequestHandler } from "express";

import {
  createDrug,
  searchDrugs,
  getDrugById,
  getDrugAvailability,
} from "./drug.controller";

const router = express.Router();

router.post("/", createDrug);

router.get("/search", searchDrugs);

router.get("/:id", getDrugById);

router.get("/:id/availability", getDrugAvailability as unknown as RequestHandler);

export default router;