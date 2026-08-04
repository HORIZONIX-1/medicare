import express from "express";

import {
  createInvoice,
  finalizeInvoice,
  getInvoice,
  listInvoices,
} from "./invoice.controller";

import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createInvoice);

router.post("/:id/finalize", authMiddleware, finalizeInvoice);

router.get("/", authMiddleware, listInvoices);

router.get("/:id", authMiddleware, getInvoice);

export default router;