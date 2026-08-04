import express, { RequestHandler } from "express";

import {
  createDrug,
  searchDrugs,
  getDrugById,
  getDrugAvailability,
  listDrugs,
  updateDrug,
  deleteDrug,
} from "./drug.controller";

const router = express.Router();

router.post("/", createDrug);

router.get("/", listDrugs);

router.get("/search", searchDrugs);

router.get("/:id", getDrugById);

router.put("/:id", updateDrug);

router.delete("/:id", deleteDrug);

router.get("/:id/availability", getDrugAvailability as unknown as RequestHandler);

export default router;