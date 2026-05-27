import express from "express";

import {
  createInvoice,
  finalizeInvoice,
  getInvoice,
} from "./invoice.controller";

const router = express.Router();

router.post("/", createInvoice);

router.post("/:id/finalize", finalizeInvoice);

router.get("/:id", getInvoice);

export default router;