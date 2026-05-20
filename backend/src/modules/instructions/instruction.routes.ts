import express, { Request, Response } from "express";
import * as instructionService from "./instruction.service";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

type AddInstructionBody = {
	consultation_id?: number;
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

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DOCTOR"), addInstruction as any);

export default router;
