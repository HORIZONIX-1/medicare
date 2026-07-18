"use client";

import { useEffect, useMemo, useState, use } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/axios";
import { PrescriptionItem } from "@/types/prescription";
import DrugSearchInput from "@/components/prescription/DrugSearchInput";
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
  const [outsideDrug, setOutsideDrug] = useState({
    drug_name: "",
    instructions: "",
    quantity: "",
  });
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

  const addOutsideDrug = () => {
    if (!outsideDrug.drug_name.trim()) return;

    setItems((current) => [
      ...current,
      {
        drug_name: outsideDrug.drug_name.trim(),
        dosage: "1 Tablet",
        instruction_1: outsideDrug.instructions.trim(),
        instruction_2: "",
        instruction_3: "",
        frequency: "1 Time / Day",
        duration: "1 Day",
        quantity: Number(outsideDrug.quantity) || 1,
        price: 0,
        is_outside_drug: true,
      },
    ]);

    setOutsideDrug({ drug_name: "", instructions: "", quantity: "" });
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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="text-slate-400 text-sm mt-4">Loading prescription...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
        <div className="mx-auto max-w-[600px] rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-200 shadow-sm text-center">
          {loadError}
        </div>
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
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </a>
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <Users size={18} />
                <span>Patients</span>
              </div>
            </a>
            <a href="#" className="dr-nav-item active">
              <div className="dr-nav-item-left">
                <Stethoscope size={18} />
                <span>OPD / Consultation</span>
              </div>
            </a>
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <FileText size={18} />
                <span>Prescriptions</span>
              </div>
            </a>
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <Send size={18} />
                <span>Referrals</span>
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
                <BarChart2 size={18} />
                <span>Reports</span>
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
                <Bell size={18} />
                <span>Notifications</span>
              </div>
              <span className="dr-nav-badge">3</span>
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
              <div className="stepper-step">
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
                  <div className="stepper-connector-line inactive flex-1" />
                </div>
              </div>
            </div>

            {/* Central White Content Card - Patient Info Banner */}
            <div className="white-card" style={{ padding: "1.75rem 2rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                  <div style={{ display: "flex", height: "3.5rem", width: "3.5rem", alignItems: "center", justifyItems: "center", justifyContent: "center", borderRadius: "9999px", backgroundColor: "#f1f5f9", fontSize: "1.5rem", color: "#64748b" }}>👤</div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>{patient.name || "-"}</h3>
                    <p style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Patient ID: <span style={{ fontFamily: "monospace", color: "#2563eb", fontWeight: 700 }}>{patient.patient_code || "-"}</span></p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1.5rem", flex: 1, maxWidth: "600px" }}>
                  <div>
                    <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Date of Birth</span>
                    <p style={{ fontSize: "0.8125rem", color: "#334155", fontWeight: 700, marginTop: "2px" }}>
                      {patient.date_of_birth ? String(patient.date_of_birth).slice(0, 10) : "-"}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Visit Date</span>
                    <p style={{ fontSize: "0.8125rem", color: "#334155", fontWeight: 700, marginTop: "2px" }}>
                      {String(visitDate).slice(0, 10)}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Diagnosis</span>
                    <p style={{ fontSize: "0.8125rem", color: "#334155", fontWeight: 700, marginTop: "2px" }}>
                      {diagnoses[0] || "Viral Fever"}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Allergies</span>
                    <p style={{ fontSize: "0.8125rem", color: "#ef4444", fontWeight: 700, marginTop: "2px" }}>
                      {allergies.length > 0 ? allergies.join(", ") : "None recorded"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Central White Content Card - Medicines Table */}
            <div className="white-card" style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div>
                  <h2 className="white-card-title">Prescription Medicines</h2>
                  <p className="white-card-subtitle" style={{ marginBottom: 0 }}>Configure drug dosages, frequencies, and duration below.</p>
                </div>
                <button onClick={addMedicineRow} className="btn-light-blue">
                  <Plus size={16} />
                  <span>Add Medicine Row</span>
                </button>
              </div>

              <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "0.5rem" }}>
                <table className="light-table" style={{ border: "none", width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "40px" }}>#</th>
                      <th style={{ minWidth: "220px" }}>Drug Name</th>
                      <th style={{ width: "120px" }}>Dosage</th>
                      <th style={{ width: "130px" }}>Speciality</th>
                      <th style={{ width: "130px" }}>Meals</th>
                      <th>Special Notes</th>
                      <th style={{ width: "130px" }}>Frequency</th>
                      <th style={{ width: "110px" }}>Duration</th>
                      <th style={{ width: "90px" }}>Qty</th>
                      <th style={{ width: "100px" }}>Price</th>
                      <th style={{ width: "60px", textAlign: "center" }}>Deny?</th>
                      <th style={{ width: "50px", textAlign: "center" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td style={{ fontWeight: 700 }}>{index + 1}</td>
                        <td>
                          <div style={{ minWidth: "200px" }}>
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
                            <span style={{ fontSize: "10px", color: "#64748b", marginTop: "3px", display: "block" }}>
                              Type: {item.is_outside_drug ? "Outside Drug" : item.dosage?.includes("Cream") ? "Cream" : "Tablet"}
                            </span>
                          </div>
                        </td>
                        <td>
                          <select
                            value={item.dosage || "1 Tablet"}
                            onChange={(e) => updateItem(index, { dosage: e.target.value })}
                            className="light-select"
                            style={{ padding: "0.375rem 0.5rem" }}
                          >
                            <option>1 Tablet</option>
                            <option>2 Tablets</option>
                            <option>Apply to affected area</option>
                          </select>
                        </td>
                        <td>
                          <select
                            value={item.instruction_1 || ""}
                            onChange={(e) => updateItem(index, { instruction_1: e.target.value })}
                            className="light-select"
                            style={{ padding: "0.375rem 0.5rem" }}
                          >
                            <option value="">Select instruction</option>
                            <option>Only at night</option>
                            <option>At Night</option>
                            <option>Apply to affected area</option>
                            <option>On empty stomach</option>
                          </select>
                        </td>
                        <td>
                          <select
                            value={item.instruction_2 || ""}
                            onChange={(e) => updateItem(index, { instruction_2: e.target.value })}
                            className="light-select"
                            style={{ padding: "0.375rem 0.5rem" }}
                          >
                            <option>After Food</option>
                            <option>Before Food</option>
                            <option>N/A</option>
                          </select>
                        </td>
                        <td>
                          <input
                            value={item.instruction_3 || ""}
                            onChange={(e) => updateItem(index, { instruction_3: e.target.value })}
                            className="light-input"
                            style={{ padding: "0.375rem 0.5rem" }}
                            placeholder="Special notes"
                          />
                        </td>
                        <td>
                          <select
                            value={item.frequency || "1 Time / Day"}
                            onChange={(e) => updateItem(index, { frequency: e.target.value })}
                            className="light-select"
                            style={{ padding: "0.375rem 0.5rem" }}
                          >
                            <option>1 Time / Day</option>
                            <option>2 Times / Day</option>
                            <option>3 Times / Day</option>
                          </select>
                        </td>
                        <td>
                          <select
                            value={item.duration || "5 Days"}
                            onChange={(e) => updateItem(index, { duration: e.target.value })}
                            className="light-select"
                            style={{ padding: "0.375rem 0.5rem" }}
                          >
                            <option>3 Days</option>
                            <option>5 Days</option>
                            <option>7 Days</option>
                            <option>--</option>
                          </select>
                        </td>
                        <td>
                          <input
                            value={item.quantity}
                            onChange={(e) => updateItem(index, { quantity: Number(e.target.value) || 0 })}
                            className="light-input"
                            style={{ padding: "0.375rem 0.5rem", textAlign: "center" }}
                          />
                        </td>
                        <td>
                          <input
                            value={item.price}
                            onChange={(e) => updateItem(index, { price: Number(e.target.value) || 0 })}
                            className="light-input"
                            style={{ padding: "0.375rem 0.5rem" }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <input
                            type="checkbox"
                            checked={Boolean((item as any).patient_denying)}
                            onChange={(e) => updateItem(index, { patient_denying: e.target.checked })}
                            className="light-checkbox"
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            type="button"
                            onClick={() => setItems((current) => current.filter((_, rowIndex) => rowIndex !== index))}
                            className="btn-light-outline"
                            style={{ padding: "0.375rem 0.5rem", color: "#ef4444", borderColor: "#fca5a5" }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>* Qty is auto-calculated based on Duration x Frequency x Dosage.</span>
                <div style={{ display: "flex", gap: "2rem", fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>
                  <span>Total Items: {totalItems}</span>
                  <span>Total Amount: <span style={{ color: "#2563eb" }}>Rs. {totalAmount.toFixed(2)}</span></span>
                </div>
              </div>
            </div>

            {/* Central White Content Card - Outside Drug */}
            <div className="white-card" style={{ marginBottom: "2rem" }}>
              <h3 className="white-card-section-title" style={{ fontSize: "1.1rem" }}>Outside Drug (Not in System)</h3>
              <p className="white-card-section-desc">Add medication that is not stocked in the clinic pharmacy.</p>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", alignItems: "flex-end" }}>
                <div className="light-input-container">
                  <label className="light-label">Drug Name</label>
                  <input
                    value={outsideDrug.drug_name}
                    onChange={(e) => setOutsideDrug((current) => ({ ...current, drug_name: e.target.value }))}
                    placeholder="Enter drug name"
                    className="light-input"
                  />
                </div>
                <div className="light-input-container">
                  <label className="light-label">Instructions</label>
                  <input
                    value={outsideDrug.instructions}
                    onChange={(e) => setOutsideDrug((current) => ({ ...current, instructions: e.target.value }))}
                    placeholder="Enter instructions"
                    className="light-input"
                  />
                </div>
                <div className="light-input-container">
                  <label className="light-label">Quantity</label>
                  <input
                    value={outsideDrug.quantity}
                    onChange={(e) => setOutsideDrug((current) => ({ ...current, quantity: e.target.value }))}
                    placeholder="Enter quantity"
                    className="light-input"
                  />
                </div>
                <button
                  type="button"
                  onClick={addOutsideDrug}
                  className="btn-light-blue"
                  style={{ height: "42px" }}
                >
                  <Plus size={16} />
                  <span>Add Outside Drug</span>
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="max-w-[1000px] mx-auto flex justify-between items-center" style={{ paddingBottom: "2rem" }}>
              <button
                type="button"
                onClick={() => router.push(`/doctor/opd/${resolvedParams.consultationId}`)}
                className="btn-light-outline"
                style={{ padding: "0.75rem 1.75rem", borderRadius: "0.5rem" }}
              >
                <ArrowLeft size={16} />
                <span>Back to OPD</span>
              </button>

              <button
                type="button"
                onClick={savePrescription}
                className="btn-light-blue"
                style={{ padding: "0.75rem 2.25rem", borderRadius: "0.5rem" }}
              >
                <span>Proceed to Invoice</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
