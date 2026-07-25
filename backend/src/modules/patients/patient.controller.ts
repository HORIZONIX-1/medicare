import * as patientService from "./patient.service";

export const searchPatients = async (req: any, res: any) => {
  try {
    const { type, value } = req.query;

    const patients = await patientService.searchPatients(
      type,
      value,
      req.user
    );

    res.json(patients);
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
    });
  }
};

export const createPatient = async (req: any, res: any) => {
  try {
    const patient = await patientService.createPatient(
      req.body,
      req.user.userId
    );

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({
      message: "Patient creation failed",
    });
  }
};

export const getPatientProfile = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const patientId = Number(id);

    if (Number.isNaN(patientId)) {
      return res.status(400).json({ message: "Invalid patient id" });
    }

    const profile = await patientService.getPatientProfile(patientId);

    if (!profile) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patient profile" });
  }
};

export const addPatientAllergy = async (req: any, res: any) => {
  try {
    const patientId = Number(req.params.id);

    if (Number.isNaN(patientId)) {
      return res.status(400).json({ message: "Invalid patient id" });
    }

    const { allergy_name } = req.body;

    if (!allergy_name || !String(allergy_name).trim()) {
      return res.status(400).json({ message: "Allergy name is required" });
    }

    const allergy = await patientService.addPatientAllergy(
      patientId,
      String(allergy_name)
    );

    res.status(201).json(allergy);
  } catch (error) {
    res.status(500).json({ message: "Failed to add patient allergy" });
  }
};