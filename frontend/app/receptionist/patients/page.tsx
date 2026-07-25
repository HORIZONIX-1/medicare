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
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Patient Records</h1>
        <p className="text-slate-500 text-sm">Register new patients or check in existing patients for consultations.</p>
      </div>

      {/* Main Form container (White card) */}
      <div className="white-card">
        {/* SECTION 1: SEARCH PATIENTS */}
        <div className="mb-10">
          <h3 className="white-card-section-title text-emerald-800">1. Find Existing Patient</h3>
          <p className="white-card-section-desc">Search for patients in your clinic database to perform check-ins.</p>

          <div className="flex gap-3 flex-wrap">
            <div className="relative min-w-[130px]">
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
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>

            <input
              type="text"
              placeholder="Search code, NIC or phone..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="light-input flex-1 min-w-[200px]"
              style={{ height: "42px" }}
            />

            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 active:scale-95 transition-all shadow-md shadow-emerald-600/10"
            >
              <Search size={16} />
              <span>{isSearching ? "Searching..." : "Search"}</span>
            </button>
          </div>

          {/* PATIENT SEARCH TABLE RESULTS */}
          <div className="mt-6">
            {patients.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                <span className="text-slate-400 text-xs">No records search results loaded.</span>
              </div>
            ) : (
              <div className="light-table-container border border-slate-150 rounded-xl overflow-hidden shadow-sm">
                <table className="light-table">
                  <thead>
                    <tr className="bg-slate-55">
                      <th>ID Code</th>
                      <th>Full Name</th>
                      <th>NIC</th>
                      <th>Phone</th>
                      <th>Gender</th>
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((p) => (
                      <tr key={p.patient_id} className="hover:bg-slate-50/55 transition">
                        <td className="light-table-code font-bold text-emerald-800">{p.patient_code}</td>
                        <td className="font-semibold text-slate-800">{p.name}</td>
                        <td>{p.nic || "—"}</td>
                        <td>{p.phone || "—"}</td>
                        <td>{p.gender}</td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                            <button
                              onClick={() => router.push(`/receptionist/patients/${p.patient_id}`)}
                              className="px-3 py-1 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => startCheckInFlow(p)}
                              className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-bold transition"
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

        {/* Divider */}
        <div className="relative my-10 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative px-4 bg-white text-slate-400 text-xs font-bold uppercase tracking-wider">
            Or Register New
          </span>
        </div>

        {/* SECTION 2: REGISTER NEW PATIENT */}
        <div>
          <h3 className="white-card-section-title text-emerald-800">2. Register New Patient</h3>
          <p className="white-card-section-desc">Create a new patient record in the clinic database.</p>

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

          <form onSubmit={handleSubmit(handleRegisterSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="light-input-container">
                <label className="light-label">Full Name <span className="light-required">*</span></label>
                <div className="relative">
                  <input
                    {...register("name", { required: true })}
                    placeholder="John Doe"
                    className="light-input"
                    style={{ paddingLeft: "2.5rem" }}
                    required
                  />
                  <User size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="light-input-container">
                <label className="light-label">NIC</label>
                <div className="relative">
                  <input
                    {...register("nic")}
                    placeholder="9-digit or 12-digit NIC"
                    className="light-input"
                    style={{ paddingLeft: "2.5rem" }}
                  />
                  <CreditCard size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="light-input-container">
                <label className="light-label">Phone Number</label>
                <div className="relative">
                  <input
                    {...register("phone")}
                    placeholder="07XXXXXXXX"
                    className="light-input"
                    style={{ paddingLeft: "2.5rem" }}
                  />
                  <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="light-input-container">
                <label className="light-label">Date of Birth <span className="light-required">*</span></label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("date_of_birth", { required: true })}
                    className="light-input"
                    style={{ paddingLeft: "2.5rem" }}
                    required
                  />
                  <Calendar size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="light-input-container">
                <label className="light-label">Gender <span className="light-required">*</span></label>
                <div className="relative">
                  <select
                    {...register("gender", { required: true })}
                    className="light-select"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", appearance: "none" }}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <User size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                  <ChevronDown size={14} className="absolute right-3.5 top-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="light-input-container">
                <label className="light-label">Address</label>
                <div className="relative">
                  <input
                    {...register("address")}
                    placeholder="Address street and city"
                    className="light-input"
                    style={{ paddingLeft: "2.5rem" }}
                  />
                  <FileText size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isRegistering}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-md shadow-emerald-600/10 active:scale-95 transition-all"
              >
                <UserPlus size={18} />
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
