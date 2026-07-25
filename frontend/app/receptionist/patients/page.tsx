"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import {
  Search,
  UserPlus,
  Calendar,
  ChevronDown,
  User,
  Phone,
  FileText,
  CreditCard,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function ReceptionistPatients() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  // Patients Search list
  const [searchType, setSearchType] = useState("patient_id");
  const [searchValue, setSearchValue] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Doctors list (for check-in)
  const [doctors, setDoctors] = useState<any[]>([]);

  // Check-in modal
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [targetPatient, setTargetPatient] = useState<any>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | "">("");
  const [checkInStatus, setCheckInStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  // Patient registration status
  const [registerStatus, setRegisterStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  // Fetch doctors in same organization
  const fetchDoctors = async () => {
    try {
      const response = await api.get("/api/v1/receptionist/stats");
      setDoctors(response.data.doctorStats || []);
    } catch (err) {
      console.error("Failed to load doctor lists:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    // Fetch initial list of all patients in organization
    const loadInitialPatients = async () => {
      try {
        setIsSearching(true);
        const response = await api.get("/patients/search", {
          params: {
            type: "patient_id",
            value: ""
          }
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to load initial patients list:", error);
      } finally {
        setIsSearching(false);
      }
    };
    loadInitialPatients();
  }, []);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const response = await api.get("/patients/search", {
        params: {
          type: searchType,
          value: searchValue || ""
        }
      });
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleRegisterSubmit = async (data: any) => {
    try {
      setIsRegistering(true);
      setRegisterStatus(null);
      const response = await api.post("/patients", data);
      const newPatient = response.data;
      setRegisterStatus({
        type: "success",
        message: `Patient ${newPatient.name} registered successfully! Assigned Code: ${newPatient.patient_code}`
      });
      reset();
      // Pre-populate search with the new patient code to easily let them check in
      setSearchType("patient_id");
      setSearchValue(newPatient.patient_code);
      setPatients([newPatient]);
    } catch (error: any) {
      console.error(error);
      setRegisterStatus({
        type: "error",
        message: error.response?.data?.message || "Patient registration failed. Verify NIC/Phone format."
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const startCheckInFlow = (patient: any) => {
    setTargetPatient(patient);
    setSelectedDoctorId("");
    setCheckInStatus(null);
    setIsCheckInModalOpen(true);
  };

  const handleConfirmCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPatient || !selectedDoctorId) return;

    try {
      setIsCheckingIn(true);
      setCheckInStatus(null);
      const response = await api.post("/api/v1/receptionist/check-in", {
        patient_id: targetPatient.patient_id,
        doctor_id: Number(selectedDoctorId)
      });
      setCheckInStatus({
        type: "success",
        message: response.data.message || "Check-in completed successfully!"
      });
      // Refresh doctor lists to reflect stats
      fetchDoctors();
    } catch (error: any) {
      console.error(error);
      setCheckInStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to check in patient."
      });
    } finally {
      setIsCheckingIn(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-6">
      {/* Main Form container (White card) */}
      <div className="white-card">
        <div className="white-card-step-title">Step 1 of 6</div>
        <h2 className="white-card-title">Select Patient</h2>
        <p className="white-card-subtitle">
          Search for an existing patient or register a new patient.
        </p>

        {/* SECTION 1: SEARCH PATIENTS */}
        <div className="mb-10">
          <h3 className="white-card-section-title">1. Search Existing Patient</h3>
          <p className="white-card-section-desc">Search using Patient ID, NIC or Phone number.</p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <div style={{ position: "relative", minWidth: "150px" }}>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="light-select"
                style={{ appearance: "none", paddingRight: "2.25rem", height: "42px" }}
              >
                <option value="patient_id">Patient ID</option>
                <option value="nic">NIC</option>
                <option value="phone">Phone number</option>
              </select>
              <div style={{ pointerEvents: "none", position: "absolute", inset: "0 0.75rem 0 auto", display: "flex", alignItems: "center", color: "#94a3b8" }}>
                <ChevronDown size={16} />
              </div>
            </div>

            <input
              type="text"
              placeholder="Enter Patient ID, NIC or Phone number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="light-input"
              style={{ flex: 1, minWidth: "200px", height: "42px" }}
            />

            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="btn-light-blue"
              style={{ height: "42px", borderRadius: "0.5rem" }}
            >
              <Search size={16} />
              <span>{isSearching ? "Searching..." : "Search"}</span>
            </button>
          </div>

          {/* PATIENT SEARCH TABLE RESULTS */}
          <div className="mt-6">
            {patients.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "2.5rem 1.5rem",
                backgroundColor: "#f8fafc",
                border: "1px dashed #cbd5e1",
                borderRadius: "0.5rem"
              }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem", opacity: 0.6 }}>📁</span>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#475569" }}>No Patients Displayed</p>
                <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>
                  Submit a search query above to fetch record matches from the clinic base.
                </p>
              </div>
            ) : (
              <div className="light-table-container">
                <table className="light-table">
                  <thead>
                    <tr>
                      <th>Patient ID</th>
                      <th>Name</th>
                      <th>NIC</th>
                      <th>Phone</th>
                      <th>Gender</th>
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((p) => (
                      <tr key={p.patient_id}>
                        <td className="light-table-code">{p.patient_code}</td>
                        <td className="light-table-name">{p.name}</td>
                        <td>{p.nic || "—"}</td>
                        <td>{p.phone || "—"}</td>
                        <td>{p.gender}</td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                            <button
                              onClick={() => router.push(`/receptionist/patients/${p.patient_id}`)}
                              className="btn-light-outline"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => startCheckInFlow(p)}
                              className="btn-light-select"
                              style={{ minWidth: "80px" }}
                            >
                              Check In
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* OR Divider */}
        <div className="or-divider-container">
          <div className="or-divider-line" />
          <span className="or-divider-badge">OR</span>
        </div>

        {/* SECTION 2: REGISTER NEW PATIENT */}
        <div>
          <h3 className="white-card-section-title">2. Register New Patient</h3>
          <p className="white-card-section-desc">If patient is not registered, create a new patient account.</p>

          {registerStatus && (
            <div className={`p-4 rounded-xl border text-xs font-semibold mb-6 flex items-start gap-2 ${
              registerStatus.type === "success" 
                ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
                : "bg-red-50 border-red-100 text-red-800"
            }`}>
              {registerStatus.type === "success" ? <CheckCircle size={16} className="mt-0.5" /> : <AlertCircle size={16} className="mt-0.5" />}
              <span>{registerStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(handleRegisterSubmit)}>
            {/* Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
              <div className="light-input-container">
                <label className="light-label">Full Name <span className="light-required">*</span></label>
                <input
                  {...register("name", { required: true })}
                  placeholder="Enter full name"
                  className="light-input"
                  required
                />
              </div>

              <div className="light-input-container">
                <label className="light-label">NIC <span className="light-required">*</span></label>
                <input
                  {...register("nic", { required: true })}
                  placeholder="Enter NIC"
                  className="light-input"
                  required
                />
              </div>

              <div className="light-input-container">
                <label className="light-label">Phone Number <span className="light-required">*</span></label>
                <input
                  {...register("phone", { required: true })}
                  placeholder="Enter phone number"
                  className="light-input"
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              <div className="light-input-container">
                <label className="light-label">Date of Birth <span className="light-required">*</span></label>
                <div style={{ position: "relative" }}>
                  <input
                    type="date"
                    {...register("date_of_birth", { required: true })}
                    className="light-input"
                    style={{ paddingRight: "2.5rem" }}
                    required
                  />
                  <Calendar 
                    size={16} 
                    style={{ 
                      position: "absolute", 
                      inset: "0 0.875rem 0 auto", 
                      margin: "auto", 
                      color: "#94a3b8", 
                      pointerEvents: "none" 
                    }} 
                  />
                </div>
              </div>

              <div className="light-input-container">
                <label className="light-label">Gender <span className="light-required">*</span></label>
                <div style={{ position: "relative" }}>
                  <select
                    {...register("gender", { required: true })}
                    className="light-select"
                    style={{ appearance: "none", paddingRight: "2.5rem" }}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      position: "absolute", 
                      inset: "0 0.875rem 0 auto", 
                      margin: "auto", 
                      color: "#94a3b8", 
                      pointerEvents: "none" 
                    }} 
                  />
                </div>
              </div>

              <div className="light-input-container">
                <label className="light-label">Address (Optional)</label>
                <input
                  {...register("address")}
                  placeholder="Enter address"
                  className="light-input"
                />
              </div>
            </div>

            {/* Row 3 Checkbox & Register Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <label className="light-checkbox-container">
                <input type="checkbox" className="light-checkbox" />
                <span className="light-checkbox-label">Send registration confirmation via SMS / WhatsApp</span>
              </label>

              <button
                type="submit"
                disabled={isRegistering}
                className="btn-light-blue"
                style={{ borderRadius: "0.5rem" }}
              >
                <UserPlus size={16} />
                <span>{isRegistering ? "Registering..." : "Register Patient"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CHECK-IN MODAL POPUP */}
      {isCheckInModalOpen && targetPatient && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Check-In Consultation</h3>
                <p className="text-slate-500 text-xs">Assign patient to organization doctor.</p>
              </div>
              <button
                onClick={() => setIsCheckInModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {checkInStatus && (
                <div className={`p-3 rounded-xl border text-xs font-semibold mb-4 flex items-start gap-2 ${
                  checkInStatus.type === "success" 
                    ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
                    : "bg-red-50 border-red-100 text-red-800"
                }`}>
                  {checkInStatus.type === "success" ? <CheckCircle size={14} className="mt-0.5" /> : <AlertCircle size={14} className="mt-0.5" />}
                  <span>{checkInStatus.message}</span>
                </div>
              )}

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Patient to check in</span>
                <h4 className="font-bold text-slate-800 text-sm mt-0.5">{targetPatient.name}</h4>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{targetPatient.patient_code}</span>
              </div>

              <form onSubmit={handleConfirmCheckIn}>
                <div className="mb-6">
                  <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">
                    Select Doctor
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value === "" ? "" : Number(e.target.value))}
                    required
                    className="light-select text-xs"
                    style={{ height: "38px" }}
                  >
                    <option value="">Select Doctor...</option>
                    {doctors.map((doc: any) => (
                      <option key={doc.doctor_id} value={doc.doctor_id}>
                        Dr. {doc.name} ({doc.consultations_count} today)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsCheckInModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCheckingIn || !selectedDoctorId}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isCheckingIn ? "Checking in..." : "Confirm Check-in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
