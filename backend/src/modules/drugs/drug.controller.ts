import type { Request, Response } from "express";

import * as drugService
  from "./drug.service";

export const createDrug =
  async (req: Request, res: Response) => {

  try {

    const drug =
      await drugService.createDrug(
        req.body
      );

    res.status(201).json(drug);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create drug",
    });
  }
};

export const searchDrugs =
  async (req: Request, res: Response) => {

  try {

    const query =
      req.query.query as string;

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

    res.json(drug);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to get drug",
    });
  }
};

export const getDrugAvailability =
  async (req: { params: { id: any; }; }, res: { json: (arg0: { available_quantity: number; reorder_level: number; status: string; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {

  try {

    const result =
      await drugService
        .getDrugAvailability(
          Number(req.params.id)
        );

    res.json(result);

  } catch (error) {

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
  try {
    const drug = await drugService.updateDrug(Number(req.params.id), req.body);
    res.json({ success: true, data: drug });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to update drug" });
  }
};

export const deleteDrug = async (req: Request, res: Response) => {
  try {
    const result = await drugService.deleteDrug(Number(req.params.id));
    res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to delete drug" });
  }
};