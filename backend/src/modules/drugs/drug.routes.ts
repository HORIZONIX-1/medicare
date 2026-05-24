import express from "express";

import {
  createDrug,
  searchDrugs,
  getDrugById,
} from "./drug.controller";

const router = express.Router();

router.post("/", createDrug);

router.get("/search", searchDrugs);

router.get("/:id", getDrugById);

export default router;