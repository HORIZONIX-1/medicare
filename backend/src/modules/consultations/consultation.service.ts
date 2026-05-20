import prisma from "../../config/prisma";

export const startConsultation =
  async (patientId: any, doctorId: any) => {

  return prisma.consultation.create({
    data: {
      patient_id: patientId,
      doctor_id: doctorId,
      visit_date: new Date(),
    },
  });
};

export const updateConsultation =
  async (consultationId: number, data: { notes: any; }) => {

  return prisma.consultation.update({
    where: {
      consultation_id: consultationId,
    },

    data: {
      notes: data.notes,
    },
  });
};

export const getConsultation =
  async (consultationId: number) => {

  return prisma.consultation.findUnique({
    where: {
      consultation_id: consultationId,
    },

    include: {
      patient: true,

      consultationSymptoms: {
        include: {
          symptom: true,
        },
      },

      examinations: true,

      investigations: true,

      instructions: true,

      diagnoses: true,
    },
  });
};