import express, { Request, Response } from "express";
import * as examinationService from "./examination.service";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

type AddExaminationBody = {
	consultation_id?: number;
	title?: string;
	result?: string;
};

const addExamination = async (
	req: Request<{}, {}, AddExaminationBody>,
	res: Response
) => {
	try {
		const { consultation_id, title, result } = req.body;

		if (!consultation_id || !title || !result) {
			return res.status(400).json({
				message: "consultation_id, title, and result are required",
			});
		}

		const examination = await examinationService.addExamination({
			consultation_id,
			title,
			result,
		});

		return res.status(201).json(examination);
	} catch (_error) {
		return res.status(500).json({
			message: "Failed to add examination",
		});
	}
};

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DOCTOR"), addExamination as any);

export default router;
