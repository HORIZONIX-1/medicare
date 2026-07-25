import prisma from "../../config/prisma";

export const getReceptionistStats = async (userId: number) => {
  // 1. Get receptionist's organization_id
  const receptionist = await prisma.user.findUnique({
    where: { user_id: userId },
    select: { organization_id: true }
  });

  const orgId = receptionist?.organization_id;
  if (!orgId) {
    throw new Error("User does not belong to any organization");
  }

  // Get start and end of today in local timezone
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // 2. Count total patients in organization
  const totalPatients = await prisma.patient.count({
    where: { organization_id: orgId }
  });

  // 3. Count new patients today in organization
  const newPatientsToday = await prisma.patient.count({
    where: {
      organization_id: orgId,
      created_at: {
        gte: startOfToday,
        lte: endOfToday
      }
    }
  });

  // 4. Count total consultations today in this organization (via patient organization)
  const totalConsultationsToday = await prisma.consultation.count({
    where: {
      patient: {
        organization_id: orgId
      },
      visit_date: {
        gte: startOfToday,
        lte: endOfToday
      }
    }
  });

  // 5. Get recent patient registrations (last 5)
  const recentPatients = await prisma.patient.findMany({
    where: { organization_id: orgId },
    orderBy: { created_at: "desc" },
    take: 5,
    select: {
      patient_id: true,
      patient_code: true,
      name: true,
      gender: true,
      phone: true,
      created_at: true
    }
  });

  // 6. Get doctor consultation count for today in this organization
  const doctors = await prisma.user.findMany({
    where: {
      organization_id: orgId,
      role: "DOCTOR",
      is_active: true
    },
    select: {
      user_id: true,
      name: true,
      email: true,
      consultations: {
        where: {
          visit_date: {
            gte: startOfToday,
            lte: endOfToday
          }
        },
        select: {
          consultation_id: true
        }
      }
    }
  });

  const doctorStats = doctors.map(d => ({
    doctor_id: d.user_id,
    name: d.name,
    email: d.email,
    consultations_count: d.consultations.length
  }));

  // 7. Get organization details
  const organization = await prisma.organization.findUnique({
    where: { organization_id: orgId }
  });

  return {
    totalPatients,
    newPatientsToday,
    totalConsultationsToday,
    recentPatients,
    doctorStats,
    organization
  };
};

export const checkInPatient = async (patientId: number, doctorId: number, userId: number) => {
  // Verify patient exists and belongs to the receptionist's organization
  const receptionist = await prisma.user.findUnique({
    where: { user_id: userId },
    select: { organization_id: true }
  });

  const patient = await prisma.patient.findUnique({
    where: { patient_id: patientId },
    select: { organization_id: true }
  });

  if (!patient || patient.organization_id !== receptionist?.organization_id) {
    throw new Error("Patient not found or belongs to another organization");
  }

  // Verify doctor exists and belongs to the same organization
  const doctor = await prisma.user.findUnique({
    where: { user_id: doctorId },
    select: { organization_id: true, role: true }
  });

  if (!doctor || doctor.role !== "DOCTOR" || doctor.organization_id !== receptionist?.organization_id) {
    throw new Error("Doctor not found or belongs to another organization");
  }

  // Create a new consultation for today
  return prisma.consultation.create({
    data: {
      patient_id: patientId,
      doctor_id: doctorId,
      visit_date: new Date()
    }
  });
};
