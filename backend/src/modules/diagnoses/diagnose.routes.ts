import express, { Request, Response } from "express";
import * as diagnoseService from "./diagnose.service";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

type AddDiagnosisBody = {
	consultation_id?: number;
	diagnosis_name?: string;
	notes?: string;
};

type UpdateDiagnosisBody = {
	diagnosis_name?: string;
	notes?: string;
};

const addDiagnosis = async (
	req: Request<{}, {}, AddDiagnosisBody>,
	res: Response
) => {
	try {
		const { consultation_id, diagnosis_name, notes } = req.body;

		if (!consultation_id || !diagnosis_name) {
			return res.status(400).json({
				message: "consultation_id and diagnosis_name are required",
			});
		}

		const diagnosis = await diagnoseService.addDiagnosis({
			consultation_id,
			diagnosis_name,
			notes: notes ?? null,
		});

		return res.status(201).json(diagnosis);
	} catch (_error) {
		return res.status(500).json({
			message: "Failed to add diagnosis",
		});
	}
};

const updateDiagnosis = async (
	req: Request<{ diagnosisId: string }, {}, UpdateDiagnosisBody>,
	res: Response
) => {
	try {
		const diagnosisId = Number(req.params.diagnosisId);
		const { diagnosis_name, notes } = req.body;

		if (!diagnosisId || Number.isNaN(diagnosisId)) {
			return res.status(400).json({ message: "diagnosisId is required" });
		}

		if (!diagnosis_name || !diagnosis_name.trim()) {
			return res.status(400).json({ message: "diagnosis_name is required" });
		}

		const diagnosis = await diagnoseService.updateDiagnosis(diagnosisId, {
			diagnosis_name: diagnosis_name.trim(),
			notes: notes ?? null,
		});

		return res.json(diagnosis);
	} catch (_error: any) {
		if (_error?.code === "P2025") {
			return res.status(404).json({ message: "Diagnosis not found" });
		}

		return res.status(500).json({ message: "Failed to update diagnosis" });
	}
};

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DOCTOR"), addDiagnosis as any);

router.put("/:diagnosisId", authMiddleware, roleMiddleware("DOCTOR"), updateDiagnosis as any);

export default router;

