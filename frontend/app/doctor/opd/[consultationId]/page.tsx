"use client";

import { useEffect, useRef, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import api from "@/lib/axios";

import { Consultation }
  from "@/types/consultation";

import PatientHeader
  from "@/components/opd/PatientHeader";

import ChiefComplaintCard
  from "@/components/opd/ChiefComplaintCard";

import SymptomsCard
  from "@/components/opd/SymptomsCard";

import ExaminationCard, {
  type ExaminationCardHandle,
} from "@/components/opd/ExaminationCard";

import InvestigationCard
  from "@/components/opd/InvestigationCard";

import InstructionCard
  from "@/components/opd/InstructionCard";

import AllergyCard
  from "@/components/opd/AllergyCard";

import DiagnosisCard
  from "@/components/opd/DiagnosisCard";

import DoctorNotesCard
  from "@/components/opd/DoctorNotesCard";

import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  FileText, 
  Send, 
  Receipt, 
  BarChart2, 
  Calendar as CalendarIcon, 
  Bell, 
  Settings as SettingsIcon, 
  LogOut,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Plus
} from "lucide-react";

interface Props {
  params: Promise<{
    consultationId: string;
  }>;
}

export default function OPDPage({
  params,
}: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const chiefComplaintDirtyRef = useRef(false);
  const doctorNotesDirtyRef = useRef(false);
  const examinationCardRef = useRef<ExaminationCardHandle | null>(null);

  const [consultation, setConsultation] =
    useState<Consultation | null>(null);
  const [chiefComplaint, setChiefComplaint] = useState<string>("");
  const [doctorNotes, setDoctorNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(2); // 2, 3, or 4
  const [formattedDate, setFormattedDate] = useState("Wednesday, June 12, 2024");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        setCurrentUser(JSON.parse(userString));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fetchConsultation =
    async (): Promise<Consultation | null> => {

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoadError("Please sign in to view this consultation.");
        router.replace("/auth/login");
        return null;
      }

      const response =
        await api.get(
          `/consultations/${resolvedParams.consultationId}`
        );

      const nextConsultation = {
        ...response.data,
        symptoms:
          response.data.symptoms ?? response.data.consultationSymptoms ?? [],
        examinations: response.data.examinations ?? [],
      };

      setConsultation(nextConsultation);

      if (!chiefComplaintDirtyRef.current) {
        setChiefComplaint(nextConsultation.chief_complaint || "");
      }

      if (!doctorNotesDirtyRef.current) {
        setDoctorNotes(nextConsultation.notes || "");
      }

      return nextConsultation;

    } catch (error) {
      console.error(error);
      setLoadError("Unable to load consultation.");

      const status = (error as any)?.response?.status;

      if (status === 401) {
        router.replace("/auth/login");
      }

      return null;
    }
  };

  const handleDataAdded = async () => {
    try {
      await fetchConsultation();
    } catch (err) {
      console.error("handleDataAdded navigation check failed", err);
    }
  };

  useEffect(() => {
    chiefComplaintDirtyRef.current = false;
    doctorNotesDirtyRef.current = false;
    fetchConsultation();
  }, [resolvedParams.consultationId]);

  useEffect(() => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setFormattedDate(new Date().toLocaleDateString('en-US', options));
    } catch (e) {
      // fallback
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!consultation) {
    if (loadError) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
          <p className="text-slate-400 text-sm mt-4">{loadError}</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="text-slate-400 text-sm mt-4">Loading consultation...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* Hide default site layout headers and footers for this page */
        .header-main,
        .footer {
          display: none !important;
        }
        .main-content {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>

      <div className="dr-layout">
        {/* Left Sidebar */}
        <aside className="dr-sidebar">
          {/* Logo Area */}
          <div className="dr-sidebar-logo">
            <div className="dr-logo-icon">
              <Plus size={20} strokeWidth={3} />
            </div>
            <div className="dr-logo-text">
              <span className="dr-logo-title">MediCore</span>
              <span className="dr-logo-subtitle">Clinic Suite</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="dr-sidebar-nav">
            <Link href="/doctor/dashboard" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link href="/doctor/patients" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <Users size={18} />
                <span>Patients</span>
              </div>
            </Link>
            <Link href="/doctor/opd" className="dr-nav-item active">
              <div className="dr-nav-item-left">
                <Stethoscope size={18} />
                <span>OPD / Consultation</span>
              </div>
            </Link>
            <Link href="/doctor/prescription" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <FileText size={18} />
                <span>Prescriptions</span>
              </div>
            </Link>
            <Link href="/doctor/invoice" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <Receipt size={18} />
                <span>Invoices</span>
              </div>
            </Link>
            <Link href="/doctor/calendar" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <CalendarIcon size={18} />
                <span>Calendar</span>
              </div>
            </Link>
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <SettingsIcon size={18} />
                <span>Settings</span>
              </div>
            </a>
          </nav>

          {/* Sidebar Footer Logout */}
          <div className="dr-sidebar-footer">
            <button onClick={handleLogout} className="dr-logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="dr-main-content">
          {/* Header */}
          <header className="dr-header">
            <div className="dr-header-date">
              <CalendarIcon size={16} className="text-blue-600" />
              <span>{formattedDate}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>

            <div className="dr-header-right">
              {/* Notifications */}
              <button className="dr-bell-btn">
                <Bell size={18} />
                <span className="dr-bell-badge">3</span>
              </button>

              {/* Doctor Profile */}
              <div className="dr-profile-badge">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
                  alt="Dr. Sarah Bennett"
                  className="dr-profile-avatar"
                />
                <div className="dr-profile-info">
                  <span className="dr-profile-name">
                    {currentUser?.name ? `Dr. ${currentUser.name}` : "Dr. Sarah Bennett"}
                  </span>
                  <span className="dr-profile-role">Cardiologist</span>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
          </header>

          {/* Page Body Scrollable */}
          <main className="dr-content-scroll">
            <div className="dr-page-header">
              <h1 className="dr-page-title">Consultation</h1>
            </div>

            {/* Stepper Progress Bar */}
            <div className="consultation-stepper">
              {/* Steps */}
              <div className="stepper-step active">
                <div className="stepper-circle">1</div>
                <span className="stepper-label">Select Patient</span>
              </div>
              <div className={`stepper-step ${activeStep >= 2 ? "active" : ""}`}>
                <div className="stepper-circle">2</div>
                <span className="stepper-label">Chief Complaint</span>
              </div>
              <div className={`stepper-step ${activeStep >= 3 ? "active" : ""}`}>
                <div className="stepper-circle">3</div>
                <span className="stepper-label">Examination</span>
              </div>
              <div className={`stepper-step ${activeStep >= 4 ? "active" : ""}`}>
                <div className="stepper-circle">4</div>
                <span className="stepper-label">Diagnosis & Notes</span>
              </div>
              <div className="stepper-step">
                <div className="stepper-circle">5</div>
                <span className="stepper-label">Prescription</span>
              </div>
              <div className="stepper-step">
                <div className="stepper-circle">6</div>
                <span className="stepper-label">Review & Invoice</span>
              </div>

              {/* Connector lines behind */}
              <div className="stepper-connector">
                <div className="flex w-full h-full items-center justify-between" style={{ gap: "2px" }}>
                  <div className="stepper-connector-line active flex-1" />
                  <div className={`stepper-connector-line flex-1 ${activeStep >= 3 ? "active" : "inactive"}`} />
                  <div className={`stepper-connector-line flex-1 ${activeStep >= 4 ? "active" : "inactive"}`} />
                  <div className="stepper-connector-line inactive flex-1" />
                  <div className="stepper-connector-line inactive flex-1" />
                </div>
              </div>
            </div>

            {/* Main consultation page content */}
            <div style={{ maxWidth: "1000px", margin: "0 auto 2rem auto" }}>
              <PatientHeader patient={consultation.patient} />

              {activeStep === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <ChiefComplaintCard
                    consultation={consultation}
                    value={chiefComplaint}
                    onChange={(nextValue) => {
                      chiefComplaintDirtyRef.current = true;
                      setChiefComplaint(nextValue);
                    }}
                  />
                  <SymptomsCard
                    consultationId={consultation.consultation_id}
                    symptoms={consultation.symptoms}
                    onDataAdded={handleDataAdded}
                  />
                </div>
              )}

              {activeStep === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <ExaminationCard
                    ref={examinationCardRef}
                    consultationId={consultation.consultation_id}
                    examinations={consultation.examinations}
                    onDataAdded={handleDataAdded}
                  />
                  <InvestigationCard
                    consultationId={consultation.consultation_id}
                    investigations={consultation.investigations}
                    onDataAdded={handleDataAdded}
                  />
                  <InstructionCard
                    consultationId={consultation.consultation_id}
                    instructions={consultation.instructions}
                    onDataAdded={handleDataAdded}
                  />
                  <AllergyCard
                    patientId={consultation.patient.patient_id}
                    allergies={consultation.patient.allergies || []}
                    onDataAdded={handleDataAdded}
                  />
                </div>
              )}

              {activeStep === 4 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <DiagnosisCard
                    consultationId={consultation.consultation_id}
                    diagnoses={consultation.diagnoses}
                    onDataAdded={handleDataAdded}
                  />
                  <DoctorNotesCard
                    consultation={consultation}
                    value={doctorNotes}
                    onChange={(nextValue) => {
                      doctorNotesDirtyRef.current = true;
                      setDoctorNotes(nextValue);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="max-w-[1000px] mx-auto flex justify-between items-center" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
              <div>
                {activeStep > 2 && (
                  <button 
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="btn-light-outline"
                    style={{ padding: "0.75rem 1.75rem", borderRadius: "0.5rem" }}
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                )}
              </div>
              
              <div>
                {activeStep < 4 ? (
                  <button 
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="btn-light-blue"
                    style={{ padding: "0.75rem 2.25rem", borderRadius: "0.5rem" }}
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    className="btn-light-blue"
                    style={{ padding: "0.75rem 2.25rem", borderRadius: "0.5rem" }}
                    disabled={isSubmitting}
                    onClick={async () => {
                      if (!consultation) return;
                      setIsSubmitting(true);
                      try {
                        await examinationCardRef.current?.saveMetrics();

                        await api.put(
                          `/consultations/${consultation.consultation_id}`,
                          {
                            chief_complaint: chiefComplaint,
                            notes: doctorNotes,
                          }
                        );
                        chiefComplaintDirtyRef.current = false;
                        doctorNotesDirtyRef.current = false;
                        router.push(`/doctor/prescription/${consultation.consultation_id}`);
                      } catch (error) {
                        console.error(error);
                        alert("Failed to proceed to prescription");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="btn-spinner" style={{
                          width: 18, height: 18,
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                          marginRight: "0.5rem"
                        }} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <span>Proceed to Prescription</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}