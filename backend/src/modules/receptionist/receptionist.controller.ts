import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as receptionistService from "./receptionist.service";

export const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const stats = await receptionistService.getReceptionistStats(userId);
    return res.status(200).json(stats);
  } catch (error: any) {
    console.error("Error in getReceptionistStats:", error);
    return res.status(500).json({
      message: error.message || "Failed to fetch receptionist dashboard statistics"
    });
  }
};

export const checkIn = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const { patient_id, doctor_id } = req.body;

    if (!patient_id || !doctor_id) {
      return res.status(400).json({
        message: "patient_id and doctor_id are required"
      });
    }

    const consultation = await receptionistService.checkInPatient(
      Number(patient_id),
      Number(doctor_id),
      userId
    );

    return res.status(201).json({
      message: "Patient checked in successfully",
      consultation
    });
  } catch (error: any) {
    if (typeof error?.message === "string" && error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error in checkIn:", error);
    return res.status(500).json({
      message: error.message || "Failed to check in patient"
    });
  }
};
