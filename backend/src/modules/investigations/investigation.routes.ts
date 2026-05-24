import express, { Request, Response } from "express";
import * as investigationService from "./investigation.service";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

type AddInvestigationBody = {
	consultation_id?: number;
	title?: string;
	description?: string;
};

type UpdateInvestigationBody = {
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

const updateInvestigation = async (
	req: Request<{ investigationId: string }, {}, UpdateInvestigationBody>,
	res: Response
) => {
	try {
		const investigationId = Number(req.params.investigationId);
		const { title, description } = req.body;

		if (!investigationId || Number.isNaN(investigationId)) {
			return res.status(400).json({ message: "investigationId is required" });
		}

		if (!title || !title.trim()) {
			return res.status(400).json({ message: "title is required" });
		}

		const investigation = await investigationService.updateInvestigation(investigationId, {
			title: title.trim(),
			description: description ?? null,
		});

		return res.json(investigation);
	} catch (_error: any) {
		if (_error?.code === "P2025") {
			return res.status(404).json({ message: "Investigation not found" });
		}

		return res.status(500).json({ message: "Failed to update investigation" });
	}
};

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DOCTOR"), addInvestigation as any);

router.put("/:investigationId", authMiddleware, roleMiddleware("DOCTOR"), updateInvestigation as any);

export default router;
