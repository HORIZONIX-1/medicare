"use client";

import { use, useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PrintableInvoice from "@/components/invoice/PrintableInvoice";
import PrintablePrescription from "@/components/invoice/PrintablePrescription";
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
  Plus,
  Printer,
  Download,
  Check
} from "lucide-react";

interface Props {
  params: Promise<{
    prescriptionId: string;
  }>;
}

function PreviewPanel({
  title,
  subtitle,
  fileName,
  children,
}: {
  title: string;
  subtitle: string;
  fileName: string;
  children: React.ReactNode;
}) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const downloadPDF = async () => {
    try {
      const element = printRef.current;

      if (!element) {
        throw new Error("Preview is not ready yet.");
      }

      const canvas = await html2canvas(element);

      if (!canvas.width || !canvas.height) {
        throw new Error("Unable to render the preview for PDF download.");
      }

      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgWidth = 595;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);
    } catch (error) {
      console.error("Failed to generate preview PDF:", error);
      const message = error instanceof Error ? error.message : "Failed to generate preview PDF.";
      window.alert(message);
    }
  };

  return (
    <section className="white-card" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: 0 }}>
      <div>
        <h2 className="white-card-title" style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{title}</h2>
        <p style={{ fontSize: "0.8125rem", color: "#64748b" }}>{subtitle}</p>
      </div>

      <div style={{ overflow: "auto", borderRadius: "0.5rem", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", padding: "1.25rem", display: "flex", justifyContent: "center" }}>
        <div ref={printRef} className="inline-block" style={{ backgroundColor: "#ffffff", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          {children}
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
        <button
          type="button"
          onClick={handlePrint}
          className="btn-light-outline"
        >
          <Printer size={16} />
          <span>Print</span>
        </button>

        <button
          type="button"
          onClick={downloadPDF}
          className="btn-light-blue"
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button>
      </div>
    </section>
  );
}

export default function InvoicePreviewPage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const searchParams = useSearchParams();

  const [prescription, setPrescription] = useState<any>(null);
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

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await api.get(`/prescriptions/${resolvedParams.prescriptionId}`);
        setPrescription(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPrescription();
  }, [resolvedParams.prescriptionId]);

  const doctorFee = Number(searchParams.get("doctorFee") ?? 500);
  const discount = Number(searchParams.get("discount") ?? 0);
  const patientDenied = searchParams.get("patientDenied") === "1";

  if (!prescription) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="text-slate-400 text-sm mt-4">Loading preview...</p>
      </div>
    );
  }

  const drugTotal = prescription.items.reduce(
    (sum: number, item: any) => sum + (item.price * item.quantity),
    0
  );

  const finalTotal = drugTotal + doctorFee - discount;

  const handleFinishVisit = async () => {
    try {
      const response = await api.post("/invoices", {
        consultation_id: prescription.consultation_id,
        prescription_id: prescription.prescription_id,
        total_drug_cost: drugTotal,
        doctor_fee: doctorFee,
        discount,
        total_amount: finalTotal,
        is_patient_denied: patientDenied,
      });

      const invoiceId = response.data.invoice_id;
      await api.post(`/invoices/${invoiceId}/finalize`);
      window.alert("Visit successful.");
      router.push("/doctor/patients");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to finish visit");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

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
            <Link href="#" className="dr-nav-item">
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
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <FileText size={18} />
                <span>Prescriptions</span>
              </div>
            </a>
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <Receipt size={18} />
                <span>Invoices</span>
              </div>
            </a>
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <CalendarIcon size={18} />
                <span>Calendar</span>
              </div>
            </a>
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
              <div className="stepper-step active">
                <div className="stepper-circle">2</div>
                <span className="stepper-label">Chief Complaint</span>
              </div>
              <div className="stepper-step active">
                <div className="stepper-circle">3</div>
                <span className="stepper-label">Examination</span>
              </div>
              <div className="stepper-step active">
                <div className="stepper-circle">4</div>
                <span className="stepper-label">Diagnosis & Notes</span>
              </div>
              <div className="stepper-step active">
                <div className="stepper-circle">5</div>
                <span className="stepper-label">Prescription</span>
              </div>
              <div className="stepper-step active">
                <div className="stepper-circle">6</div>
                <span className="stepper-label">Review & Invoice</span>
              </div>

              {/* Connector lines behind */}
              <div className="stepper-connector">
                <div className="flex w-full h-full items-center justify-between" style={{ gap: "2px" }}>
                  <div className="stepper-connector-line active flex-1" />
                  <div className="stepper-connector-line active flex-1" />
                  <div className="stepper-connector-line active flex-1" />
                  <div className="stepper-connector-line active flex-1" />
                  <div className="stepper-connector-line active flex-1" />
                </div>
              </div>
            </div>

            {/* Main Billing Contents */}
            <div style={{ maxWidth: "1600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div className="white-card" style={{ padding: "2rem", marginBottom: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <h2 className="white-card-title">Invoice Print Preview</h2>
                    <p className="white-card-subtitle" style={{ marginBottom: 0 }}>
                      Review the prescription and invoice printable layouts.
                    </p>
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "#64748b", display: "flex", gap: "1.5rem" }}>
                    <span>Doctor Fee: <b>Rs. {doctorFee}</b></span>
                    <span>Discount: <b>Rs. {discount}</b></span>
                    <span>Status: <b>{patientDenied ? "Patient Denied Medicines" : "Proceeding"}</b></span>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))", gap: "2rem" }}>
                <PreviewPanel
                  title="Prescription View"
                  subtitle="Medication order, dosage, and instructions"
                  fileName={`prescription-${resolvedParams.prescriptionId}.pdf`}
                >
                  <PrintablePrescription prescription={prescription} />
                </PreviewPanel>

                <PreviewPanel
                  title="Invoice View"
                  subtitle="Billing summary and payment totals"
                  fileName={`invoice-${resolvedParams.prescriptionId}.pdf`}
                >
                  <PrintableInvoice
                    invoice={{
                      consultation: prescription.consultation,
                      prescription,
                      total_drug_cost: drugTotal,
                      doctor_fee: doctorFee,
                      discount,
                      total_amount: finalTotal,
                    }}
                  />
                </PreviewPanel>
              </div>
            </div>

            {/* Bottom Actions Back */}
            <div className="max-w-[1600px] mx-auto flex justify-between items-center" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-light-outline"
                style={{ padding: "0.75rem 1.75rem", borderRadius: "0.5rem" }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleFinishVisit}
                className="btn-light-blue"
                style={{ padding: "0.75rem 2.25rem", borderRadius: "0.5rem" }}
              >
                <Check size={16} />
                <span>Finish Visit</span>
              </button>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}