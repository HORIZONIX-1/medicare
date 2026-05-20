import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const addInstruction = async (data: {
	consultation_id: number;
	instruction: string;
}) => {
	return prisma.patientInstruction.create({
		data: {
			consultation_id: data.consultation_id,
			instruction: data.instruction,
		},
	});
};
