"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import api from "@/lib/axios";
import InvoiceSummary from "@/components/invoice/InvoiceSummary";
import InvoiceDrugTable from "@/components/invoice/InvoiceDrugTable";
import InvoiceActions from "@/components/invoice/InvoiceActions";

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
    prescriptionId: string;
  }>;
}

export default function InvoicePage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);

  const [prescription, setPrescription] = useState<any>(null);
  const [doctorFee, setDoctorFee] = useState(500);
  const [discount, setDiscount] = useState(0);
  const [patientDenied, setPatientDenied] = useState(false);
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
    fetchPrescription();
  }, [resolvedParams.prescriptionId]);

  const fetchPrescription = async () => {
    try {
      const response = await api.get(`/prescriptions/${resolvedParams.prescriptionId}`);
      setPrescription(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!prescription) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="text-slate-400 text-sm mt-4">Loading invoice...</p>
      </div>
    );
  }

  const drugTotal = prescription.items.reduce(
    (sum: number, item: any) => sum + (item.price * item.quantity),
    0
  );

  const finalTotal = drugTotal + doctorFee - discount;

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
            <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div className="white-card" style={{ padding: "2rem", marginBottom: 0 }}>
                <h2 className="white-card-title">Invoice & Finalize</h2>
                <p className="white-card-subtitle" style={{ marginBottom: 0 }}>
                  Review medication costs, doctor fees, discounts, and preview printable invoices.
                </p>
              </div>

              <div className="white-card" style={{ marginBottom: 0 }}>
                <InvoiceDrugTable items={prescription.items} />
              </div>

              <div className="white-card" style={{ marginBottom: 0 }}>
                <InvoiceSummary
                  drugTotal={drugTotal}
                  doctorFee={doctorFee}
                  setDoctorFee={setDoctorFee}
                  discount={discount}
                  setDiscount={setDiscount}
                  patientDenied={patientDenied}
                  setPatientDenied={setPatientDenied}
                  finalTotal={finalTotal}
                />
              </div>

              <div className="white-card" style={{ marginBottom: 0 }}>
                <InvoiceActions
                  onPreview={() => {
                    const previewUrl = `/doctor/invoice/${resolvedParams.prescriptionId}/preview?doctorFee=${doctorFee}&discount=${discount}&patientDenied=${patientDenied ? 1 : 0}`;
                    router.push(previewUrl);
                  }}
                />
              </div>
            </div>

            {/* Bottom Actions Back */}
            <div className="max-w-[1000px] mx-auto flex justify-between items-center" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn-light-outline"
                style={{ padding: "0.75rem 1.75rem", borderRadius: "0.5rem" }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}