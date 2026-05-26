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
  async (consultationId: number, data: { chief_complaint?: any; notes?: any }) => {

  const updateData: any = {};
  
  if (data.chief_complaint !== undefined) {
    updateData.chief_complaint = data.chief_complaint;
  }
  
  if (data.notes !== undefined) {
    updateData.notes = data.notes;
  }

  return prisma.consultation.update({
    where: {
      consultation_id: consultationId,
    },

    data: updateData,
  });
};

export const getConsultation =
  async (consultationId: number) => {

  return prisma.consultation.findUnique({
    where: {
      consultation_id: consultationId,
    },

    include: {
      patient: {
        include: {
          allergies: true,
        },
      },

      doctor: true,

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