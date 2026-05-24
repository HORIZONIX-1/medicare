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