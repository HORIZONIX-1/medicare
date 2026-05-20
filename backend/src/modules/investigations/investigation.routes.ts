import express, { Request, Response } from "express";
import * as investigationService from "./investigation.service";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

type AddInvestigationBody = {
	consultation_id?: number;
	title?: string;
	description?: string;
};

const addInvestigation = async (
	req: Request<{}, {}, AddInvestigationBody>,
	res: Response
) => {
	try {
		const { consultation_id, title, description } = req.body;

		if (!consultation_id || !title) {
			return res.status(400).json({
				message: "consultation_id and title are required",
			});
		}

		const investigation = await investigationService.addInvestigation({
			consultation_id,
			title,
			description: description ?? null,
		});

		return res.status(201).json(investigation);
	} catch (_error) {
		return res.status(500).json({
			message: "Failed to add investigation",
		});
	}
};

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DOCTOR"), addInvestigation as any);

export default router;
