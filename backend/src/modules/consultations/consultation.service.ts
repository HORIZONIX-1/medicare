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

      doctor: { select: { user_id: true, name: true, email: true } },

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

export const listConsultations = async (currentUser?: { userId: number; role: string }) => {
  let organizationId: number | null = null;
  // Staff only see their own organization (users without one only see unaffiliated records)
  let scoped = false;

  if (currentUser && (currentUser.role === "DOCTOR" || currentUser.role === "RECEPTIONIST" || currentUser.role === "DISPENSER")) {
    const user = await prisma.user.findUnique({
      where: { user_id: currentUser.userId },
      select: { organization_id: true }
    });
    organizationId = user?.organization_id ?? null;
    scoped = true;
  }

  const where: any = {};
  if (scoped) {
    where.doctor = {
      organization_id: organizationId
    };
  }

  return prisma.consultation.findMany({
    where,
    include: {
      patient: true,
      doctor: { select: { user_id: true, name: true, email: true } },
      diagnoses: true
    },
    orderBy: {
      visit_date: "desc"
    }
  });
};

// Dashboard numbers computed in the database instead of shipping every record to the browser
export const getDashboardSummary = async (currentUser: { userId: number; role: string }) => {
  const user = await prisma.user.findUnique({
    where: { user_id: currentUser.userId },
    select: { organization_id: true },
  });
  const organizationId = user?.organization_id ?? null;
  const doctorScope = { doctor: { organization_id: organizationId } };

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
  const today = { gte: startOfToday, lt: startOfTomorrow };

  const [todayConsultations, totalPatients, totalPrescriptions, revenue, recentConsultations] =
    await Promise.all([
      prisma.consultation.count({ where: { ...doctorScope, visit_date: today } }),
      prisma.patient.count({ where: { organization_id: organizationId } }),
      prisma.prescription.count({ where: { consultation: doctorScope } }),
      prisma.invoice.aggregate({
        _sum: { total_amount: true },
        where: { is_finalized: true, created_at: today, consultation: doctorScope },
      }),
      prisma.consultation.findMany({
        where: doctorScope,
        orderBy: { visit_date: "desc" },
        take: 4,
        include: {
          patient: { select: { patient_id: true, patient_code: true, name: true } },
          diagnoses: true,
        },
      }),
    ]);

  return {
    todayConsultations,
    totalPatients,
    totalPrescriptions,
    todayRevenue: revenue._sum.total_amount ?? 0,
    recentConsultations,
  };
};
