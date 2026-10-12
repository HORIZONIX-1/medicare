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

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

const router = express.Router();

// Every drug endpoint requires a signed-in user; only dispensers/admins may change the catalog
router.use(authMiddleware as RequestHandler);

const canManageCatalog = roleMiddleware("DISPENSER", "ADMIN") as RequestHandler;

router.post("/", canManageCatalog, createDrug);

router.get("/", listDrugs);

router.get("/search", searchDrugs);

router.get("/:id", getDrugById);

router.put("/:id", canManageCatalog, updateDrug);

router.delete("/:id", canManageCatalog, deleteDrug);

router.get("/:id/availability", getDrugAvailability);

export default router;
