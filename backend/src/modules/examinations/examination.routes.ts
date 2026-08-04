import express, { Request, Response } from "express";
import * as examinationService from "./examination.service";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

type AddExaminationBody = {
	consultation_id?: number;
	title?: string;
	result?: string;
};

type UpdateExaminationBody = {
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

const updateExamination = async (
	req: Request<{ examinationId: string }, {}, UpdateExaminationBody>,
	res: Response
) => {
	try {
		const examinationId = Number(req.params.examinationId);
		const { title, result } = req.body;

		if (!examinationId || Number.isNaN(examinationId)) {
			return res.status(400).json({ message: "examinationId is required" });
		}

		if (!title || !result) {
			return res.status(400).json({
				message: "title and result are required",
			});
		}

		const examination = await examinationService.updateExamination(examinationId, {
			title,
			result,
		});

		return res.json(examination);
	} catch (_error) {
		return res.status(500).json({
			message: "Failed to update examination",
		});
	}
};

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DOCTOR"), addExamination as any);
router.put("/:examinationId", authMiddleware, roleMiddleware("DOCTOR"), updateExamination as any);

export default router;
