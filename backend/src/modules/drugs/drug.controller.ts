import type { Request, Response } from "express";

import * as drugService
  from "./drug.service";

const isUniqueViolation = (error: unknown) =>
  (error as { code?: string })?.code === "P2002";

const isNotFound = (error: unknown) =>
  (error as { code?: string })?.code === "P2025";

const validateDrugPayload = (body: any): string | null => {
  if (!body?.name || typeof body.name !== "string" || !body.name.trim()) {
    return "Drug name is required";
  }
  if (!body.category || !body.unit_type) {
    return "Category and unit type are required";
  }
  const price = Number(body.selling_price);
  if (body.selling_price === "" || !Number.isFinite(price) || price < 0) {
    return "Selling price must be a non-negative number";
  }
  if (body.reorder_level !== undefined && body.reorder_level !== "") {
    const reorder = Number(body.reorder_level);
    if (!Number.isInteger(reorder) || reorder < 0) {
      return "Reorder level must be a non-negative whole number";
    }
  }
  return null;
};

export const createDrug =
  async (req: Request, res: Response) => {

  const validationError = validateDrugPayload(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  try {

    const drug =
      await drugService.createDrug(
        req.body
      );

    res.status(201).json({ success: true, data: drug });

  } catch (error) {

    if (isUniqueViolation(error)) {
      return res.status(409).json({
        success: false,
        message: "A drug with this name already exists",
      });
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create drug",
    });
  }
};

export const searchDrugs =
  async (req: Request, res: Response) => {

  try {

    const query =
      String(req.query.query ?? "").trim();

    if (!query) {
      return res.json([]);
    }

    const drugs =
      await drugService.searchDrugs(
        query
      );

    res.json(drugs);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to search drugs",
    });
  }
};

export const getDrugById =
  async (req: Request, res: Response) => {

  try {

    const drug =
      await drugService.getDrugById(
        Number(req.params.id)
      );

    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    res.json(drug);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to get drug",
    });
  }
};

export const getDrugAvailability =
  async (req: Request, res: Response) => {

  try {

    const result =
      await drugService
        .getDrugAvailability(
          Number(req.params.id)
        );

    res.json(result);

  } catch (error) {

    if (error instanceof Error && error.message === "Drug not found") {
      return res.status(404).json({ message: error.message });
    }

    console.error(error);

    res.status(500).json({
      message:
        "Failed to get availability",
    });
  }
};

export const listDrugs = async (req: Request, res: Response) => {
  try {
    const result = await drugService.listDrugs(req.query);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to list drugs" });
  }
};

export const updateDrug = async (req: Request, res: Response) => {
  const validationError = validateDrugPayload(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  try {
    const drug = await drugService.updateDrug(Number(req.params.id), req.body);
    res.json({ success: true, data: drug });
  } catch (error) {
    if (isNotFound(error)) {
      return res.status(404).json({ success: false, message: "Drug not found" });
    }
    if (isUniqueViolation(error)) {
      return res.status(409).json({ success: false, message: "A drug with this name already exists" });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update drug" });
  }
};

export const deleteDrug = async (req: Request, res: Response) => {
  try {
    const result = await drugService.deleteDrug(Number(req.params.id));
    res.json({ success: true, data: result });
  } catch (error) {
    if (isNotFound(error)) {
      return res.status(404).json({ success: false, message: "Drug not found" });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete drug" });
  }
};
