import express, { Request, Response } from "express";
import * as instructionService from "./instruction.service";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

type AddInstructionBody = {
	consultation_id?: number;
	instruction?: string;
};

type UpdateInstructionBody = {
	instruction?: string;
};

const addInstruction = async (
	req: Request<{}, {}, AddInstructionBody>,
	res: Response
) => {
	try {
		const { consultation_id, instruction } = req.body;

		if (!consultation_id || !instruction || !instruction.trim()) {
			return res.status(400).json({
				message: "consultation_id and instruction are required",
			});
		}

		const createdInstruction = await instructionService.addInstruction({
			consultation_id,
			instruction: instruction.trim(),
		});

		return res.status(201).json(createdInstruction);
	} catch (_error) {
		return res.status(500).json({
			message: "Failed to add instruction",
		});
	}
};

const updateInstruction = async (
	req: Request<{ instructionId: string }, {}, UpdateInstructionBody>,
	res: Response
) => {
	try {
		const instructionId = Number(req.params.instructionId);
		const { instruction } = req.body;

		if (!instructionId || Number.isNaN(instructionId)) {
			return res.status(400).json({ message: "instructionId is required" });
		}

		if (!instruction || !instruction.trim()) {
			return res.status(400).json({ message: "instruction is required" });
		}

		const updatedInstruction = await instructionService.updateInstruction(instructionId, {
			instruction: instruction.trim(),
		});

		return res.json(updatedInstruction);
	} catch (_error: any) {
		if (_error?.code === "P2025") {
			return res.status(404).json({ message: "Instruction not found" });
		}

		return res.status(500).json({ message: "Failed to update instruction" });
	}
};

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DOCTOR"), addInstruction as any);

router.put("/:instructionId", authMiddleware, roleMiddleware("DOCTOR"), updateInstruction as any);

export default router;
