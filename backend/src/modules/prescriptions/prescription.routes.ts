import express from "express";

import {
  createPrescription,
  getPrescription,
  listPrescriptions,
} from "./prescription.controller";

import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /prescriptions:
 *   post:
 *     summary: Create a new prescription
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - consultation_id
 *               - total_amount
 *               - items
 *             properties:
 *               consultation_id:
 *                 type: integer
 *                 example: 1
 *               total_amount:
 *                 type: number
 *                 example: 120.50
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - drug_name
 *                     - quantity
 *                     - price
 *                   properties:
 *                     drug_id:
 *                       type: integer
 *                       example: 5
 *                     drug_name:
 *                       type: string
 *                       example: "Amoxicillin 500mg"
 *                     dosage:
 *                       type: string
 *                       example: "1 TDS"
 *                     frequency:
 *                       type: string
 *                       example: "Three times a day"
 *                     duration:
 *                       type: string
 *                       example: "5 days"
 *                     quantity:
 *                       type: integer
 *                       example: 15
 *                     price:
 *                       type: number
 *                       example: 8.00
 *                     is_outside_drug:
 *                       type: boolean
 *                       example: false
 *     responses:
 *       201:
 *         description: Prescription created; stock availability verified (stock is deducted when the invoice is finalized).
 *       400:
 *         description: Insufficient stock or invalid payload.
 *       401:
 *         description: Unauthorized.
 */
router.post("/", authMiddleware, createPrescription);

/**
 * @swagger
 * /prescriptions:
 *   get:
 *     summary: Get all prescriptions list scoped to organization
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of prescriptions.
 *       401:
 *         description: Unauthorized.
 */
router.get("/", authMiddleware, listPrescriptions);

/**
 * @swagger
 * /prescriptions/{id}:
 *   get:
 *     summary: Get prescription details by ID
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The prescription ID
 *     responses:
 *       200:
 *         description: Prescription detail object.
 *       404:
 *         description: Prescription not found.
 */
router.get("/:id", authMiddleware, getPrescription);

export default router;