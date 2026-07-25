"use client";

import { useEffect, useMemo, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import { PrescriptionItem } from "@/types/prescription";
import DrugSearchInput from "@/components/prescription/DrugSearchInput";
import OutsideDrugForm from "@/components/prescription/OutsideDrugForm";
import PatientPrescriptionBanner from "@/components/prescription/PatientPrescriptionBanner";
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
  Trash2
} from "lucide-react";

interface Props {
  params: Promise<{
    consultationId: string;
  }>;
}

export default function PrescriptionPage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);

  const [consultation, setConsultation] = useState<any | null>(null);
  const [items, setItems] = useState<PrescriptionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
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
    let active = true;

    const fetchConsultation = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await api.get(`/consultations/${resolvedParams.consultationId}`);

        if (!active) return;

        setConsultation(response.data);

        const existingItems = response.data.prescription_items ?? response.data.items ?? [];
        if (Array.isArray(existingItems) && existingItems.length > 0) {
          setItems(existingItems);
        } else {
          setItems([
            {
              drug_name: "",
              dosage: "1 Tablet",
              instruction_1: "",
              instruction_2: "",
              instruction_3: "",
              frequency: "1 Time / Day",
              duration: "5 Days",
              quantity: 1,
              price: 0,
              is_outside_drug: false,
              available_quantity: undefined,
              stock_status: undefined,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
        if (active) setLoadError("Unable to load prescription details.");
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchConsultation();

    return () => {
      active = false;
    };
  }, [resolvedParams.consultationId]);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + (Number(item.price) || 0), 0),
    [items]
  );

  const totalItems = items.length;

  const patient = consultation?.patient ?? {
    name: "Kamal Perera",
    patient_code: "P000123",
    date_of_birth: undefined,
  };

  const diagnoses = Array.isArray(consultation?.diagnoses)
    ? consultation.diagnoses.map((diagnosis: any) => diagnosis.diagnosis_name).filter(Boolean)
    : [];

  const visitDate =
    consultation?.visit_date || consultation?.created_at || consultation?.appointment_date || "2024-05-20";

  const allergies = Array.isArray(consultation?.patient?.allergies)
    ? consultation.patient.allergies.map((allergy: any) => allergy.allergy_name).filter(Boolean)
    : [];

  const parseQuantity = (frequency?: string, duration?: string, dosage?: string) => {
    const frequencyValue = Number((frequency || "").split(" ")[0]);
    const durationValue = Number((duration || "").split(" ")[0]);
    const dosageValue = dosage?.startsWith("2") ? 2 : 1;

    if (!Number.isFinite(frequencyValue) || !Number.isFinite(durationValue) || durationValue <= 0) {
      return 1;
    }

    return Math.max(1, frequencyValue * durationValue * dosageValue);
  };

  const updateItem = (index: number, data: any) => {
    setItems((current) => {
      const next = [...current];
      next[index] = {
        ...next[index],
        ...data,
      };

      next[index].quantity = parseQuantity(next[index].frequency, next[index].duration, next[index].dosage);
      return next;
    });
  };

  const addMedicineRow = () => {
    setItems((current) => [
      ...current,
      {
        drug_name: "",
        dosage: "1 Tablet",
        instruction_1: "",
        instruction_2: "",
        instruction_3: "",
        frequency: "1 Time / Day",
        duration: "5 Days",
        quantity: 5,
        price: 0,
        is_outside_drug: false,
      },
    ]);
  };

  const addOutsideDrug = (outsideDrug: { drug_name: string; instructions: string; quantity: string }) => {
    setItems((current) => [
      ...current,
      {
        drug_name: outsideDrug.drug_name,
        dosage: "1 Tablet",
        instruction_1: outsideDrug.instructions,
        instruction_2: "",
        instruction_3: "",
        frequency: "1 Time / Day",
        duration: "1 Day",
        quantity: Number(outsideDrug.quantity) || 1,
        price: 0,
        is_outside_drug: true,
      },
    ]);
  };

  const savePrescription = async () => {
    try {
      const response = await api.post("/prescriptions", {
        consultation_id: Number(resolvedParams.consultationId),
        total_amount: totalAmount,
        items,
      });

      const prescriptionId = response.data?.prescription_id;

      if (!prescriptionId) {
        throw new Error("Prescription was saved, but the invoice route could not be determined.");
      }

      router.push(`/doctor/invoice/${prescriptionId}`);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to save prescription");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex flex-col items-center justify-center font-sans">
        <div className="w-8 h-8 border-3 border-[#e5e7eb] border-t-[#111827] rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-[#475569] mt-3 uppercase tracking-wider">Loading prescription details...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex flex-col items-center justify-center font-sans p-4">
        <div className="mx-auto max-w-[500px] rounded border border-red-200 bg-red-50 p-5 text-red-700 text-xs font-bold text-center">
          {loadError}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
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
              <Plus size={18} strokeWidth={2.5} />
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
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link href="/doctor/patients" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <Users size={16} />
                <span>Patients</span>
              </div>
            </Link>
            <Link href="/doctor/opd" className="dr-nav-item active">
              <div className="dr-nav-item-left">
                <Stethoscope size={16} />
                <span>OPD / Consultation</span>
              </div>
            </Link>
            <Link href="/doctor/prescription" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <FileText size={16} />
                <span>Prescriptions</span>
              </div>
            </Link>
            <Link href="/doctor/invoice" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <Receipt size={16} />
                <span>Invoices</span>
              </div>
            </Link>
            <Link href="/doctor/calendar" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <CalendarIcon size={16} />
                <span>Calendar</span>
              </div>
            </Link>
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <SettingsIcon size={16} />
                <span>Settings</span>
              </div>
            </a>
          </nav>

          {/* Sidebar Footer Logout */}
          <div className="dr-sidebar-footer">
            <button onClick={handleLogout} className="dr-logout-btn">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="dr-main-content">
          {/* Header */}
          <header className="dr-header">
            <div className="dr-header-date">
              <CalendarIcon size={14} className="text-[#2563eb]" />
              <span>{formattedDate}</span>
              <ChevronDown size={12} className="text-gray-400" />
            </div>

            <div className="dr-header-right">
              {/* Notifications */}
              <button className="dr-bell-btn">
                <Bell size={16} />
                <span className="dr-bell-badge">3</span>
              </button>

              {/* Doctor Profile */}
              <div className="dr-profile-badge">
                <div className="w-7 h-7 rounded bg-[#111827] text-white font-black text-xs grid place-items-center">
                  {(currentUser?.name || "SB").slice(0, 2).toUpperCase()}
                </div>
                <div className="dr-profile-info">
                  <span className="dr-profile-name">
                    {currentUser?.name ? `Dr. ${currentUser.name}` : "Dr. Sarah Bennett"}
                  </span>
                  <span className="dr-profile-role">Cardiologist</span>
                </div>
                <ChevronDown size={12} className="text-gray-400" />
              </div>
            </div>
          </header>

          {/* Page Body Scrollable */}
          <main className="dr-content-scroll">
            <div className="dr-page-header">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">Consultation / Step 5</div>
              <h1 className="dr-page-title">Prescription Management</h1>
            </div>

            {/* Stepper Progress Bar */}
            <div className="consultation-stepper">
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
              <div className="stepper-step">
                <div className="stepper-circle">6</div>
                <span className="stepper-label">Review & Invoice</span>
              </div>

              <div className="stepper-connector">
                <div className="flex w-full h-full items-center justify-between" style={{ gap: "2px" }}>
                  <div className="stepper-connector-line active flex-1" />
                  <div className="stepper-connector-line active flex-1" />
                  <div className="stepper-connector-line active flex-1" />
                  <div className="stepper-connector-line active flex-1" />
                  <div className="stepper-connector-line inactive flex-1" />
                </div>
              </div>
            </div>

            {/* Patient Info Banner */}
            <PatientPrescriptionBanner
              patient={patient}
              visitDate={visitDate}
              diagnoses={diagnoses}
              allergies={allergies}
            />

            {/* Medicines Table Card */}
            <div className="bg-white border border-[#d5d9e0] rounded p-6 mb-6">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <div>
                  <h2 className="text-sm font-extrabold text-[#111827]">Prescription Medicines</h2>
                  <p className="text-xs font-medium text-[#64748b] mt-0.5">Configure drug dosages, frequencies, and duration below.</p>
                </div>
                <button 
                  type="button" 
                  onClick={addMedicineRow} 
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold text-white bg-[#111827] border border-[#111827] rounded transition-colors hover:bg-[#1f2937]"
                >
                  <Plus size={14} />
                  <span>Add Medicine Row</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-[#cbd1da] rounded">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f1f2f4] border-b border-[#cbd1da] text-[10px] font-extrabold uppercase tracking-wider text-[#475569] h-10">
                      <th className="px-3 w-10">#</th>
                      <th className="px-3 min-w-[220px]">Drug Name</th>
                      <th className="px-3 w-32">Dosage</th>
                      <th className="px-3 w-36">Speciality</th>
                      <th className="px-3 w-32">Meals</th>
                      <th className="px-3">Special Notes</th>
                      <th className="px-3 w-36">Frequency</th>
                      <th className="px-3 w-28">Duration</th>
                      <th className="px-3 w-20 text-center">Qty</th>
                      <th className="px-3 w-24">Price (Rs.)</th>
                      <th className="px-3 w-16 text-center">Deny?</th>
                      <th className="px-3 w-12 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] text-xs font-semibold text-[#111827]">
                    {items.map((item, index) => (
                      <tr key={index} className="h-12 hover:bg-[#f8fafc]">
                        <td className="px-3 font-bold text-[#475569]">{index + 1}</td>
                        <td className="px-3 py-2">
                          <div className="min-w-[200px]">
                            <DrugSearchInput
                              value={item.drug_name}
                              onChange={(val) => updateItem(index, { drug_name: val })}
                              onSelect={(drug) => updateItem(index, {
                                drug_id: drug.drug_id,
                                drug_name: drug.name,
                                price: drug.selling_price,
                                available_quantity: drug.available_quantity,
                                stock_status: drug.stock_status,
                              })}
                            />
                            <span className="text-[10px] font-semibold text-[#64748b] mt-1 block">
                              Type: {item.is_outside_drug ? "Outside Drug" : item.dosage?.includes("Cream") ? "Cream" : "Tablet"}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={item.dosage || "1 Tablet"}
                            onChange={(e) => updateItem(index, { dosage: e.target.value })}
                            className="w-full h-9 rounded border border-[#cbd1da] bg-white px-2 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
                          >
                            <option>1 Tablet</option>
                            <option>2 Tablets</option>
                            <option>Apply to affected area</option>
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={item.instruction_1 || ""}
                            onChange={(e) => updateItem(index, { instruction_1: e.target.value })}
                            className="w-full h-9 rounded border border-[#cbd1da] bg-white px-2 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
                          >
                            <option value="">Select instruction</option>
                            <option>Only at night</option>
                            <option>At Night</option>
                            <option>Apply to affected area</option>
                            <option>On empty stomach</option>
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={item.instruction_2 || "After Food"}
                            onChange={(e) => updateItem(index, { instruction_2: e.target.value })}
                            className="w-full h-9 rounded border border-[#cbd1da] bg-white px-2 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
                          >
                            <option>After Food</option>
                            <option>Before Food</option>
                            <option>N/A</option>
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <input
                            value={item.instruction_3 || ""}
                            onChange={(e) => updateItem(index, { instruction_3: e.target.value })}
                            className="w-full h-9 rounded border border-[#cbd1da] bg-white px-2 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
                            placeholder="Special notes"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={item.frequency || "1 Time / Day"}
                            onChange={(e) => updateItem(index, { frequency: e.target.value })}
                            className="w-full h-9 rounded border border-[#cbd1da] bg-white px-2 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
                          >
                            <option>1 Time / Day</option>
                            <option>2 Times / Day</option>
                            <option>3 Times / Day</option>
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={item.duration || "5 Days"}
                            onChange={(e) => updateItem(index, { duration: e.target.value })}
                            className="w-full h-9 rounded border border-[#cbd1da] bg-white px-2 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
                          >
                            <option>3 Days</option>
                            <option>5 Days</option>
                            <option>7 Days</option>
                            <option>--</option>
                          </select>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <input
                            value={item.quantity}
                            onChange={(e) => updateItem(index, { quantity: Number(e.target.value) || 0 })}
                            className="w-14 h-9 text-center rounded border border-[#cbd1da] bg-white px-1 text-xs font-bold text-[#111827] focus:border-[#111827] focus:outline-none"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            value={item.price}
                            onChange={(e) => updateItem(index, { price: Number(e.target.value) || 0 })}
                            className="w-20 h-9 rounded border border-[#cbd1da] bg-white px-2 text-xs font-bold text-[#111827] focus:border-[#111827] focus:outline-none"
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={Boolean((item as any).patient_denying)}
                            onChange={(e) => updateItem(index, { patient_denying: e.target.checked })}
                            className="w-4 h-4 rounded border-[#cbd1da] text-[#111827] focus:ring-0 accent-[#111827] cursor-pointer"
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => setItems((current) => current.filter((_, rowIndex) => rowIndex !== index))}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded border border-red-200 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-wrap justify-between items-center gap-4 pt-2">
                <span className="text-xs font-semibold text-[#64748b]">
                  * Qty is calculated based on Duration × Frequency × Dosage.
                </span>
                <div className="flex gap-6 text-xs font-extrabold text-[#111827]">
                  <span>Total Items: {totalItems}</span>
                  <span>
                    Total Amount: <span className="text-[#2563eb] font-extrabold">Rs. {totalAmount.toFixed(2)}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Outside Drug Entry Form Component */}
            <OutsideDrugForm onAdd={addOutsideDrug} />

            {/* Bottom Navigation Buttons */}
            <div className="flex justify-between items-center pb-8">
              <button
                type="button"
                onClick={() => router.push(`/doctor/opd/${resolvedParams.consultationId}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold text-[#111827] bg-white border border-[#cbd1da] rounded hover:bg-[#f3f4f6] transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back to OPD</span>
              </button>

              <button
                type="button"
                onClick={savePrescription}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-extrabold text-white bg-[#111827] border border-[#111827] rounded hover:bg-[#1f2937] transition-colors"
              >
                <span>Proceed to Invoice</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
