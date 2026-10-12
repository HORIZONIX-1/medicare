"use client";

import React, { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import {
  Users,
  UserPlus,
  Activity,
  Calendar,
  Building2,
  Phone,
  Globe,
  Search,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";

export default function ReceptionistDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check-in modal states
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("patient_id");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | "">("");
  const [checkInStatus, setCheckInStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/v1/receptionist/stats");
      setStats(response.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load dashboard data. Please make sure the backend is updated and restarted.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleSearchPatients = async () => {
    if (!searchQuery.trim()) return;
    try {
      setIsSearching(true);
      setSelectedPatient(null);
      setCheckInStatus(null);
      const response = await api.get("/patients/search", {
        params: {
          type: searchType,
          value: searchQuery
        }
      });
      setSearchResults(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCheckInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDoctorId) {
      setCheckInStatus({ type: "error", message: "Please select both a patient and a doctor." });
      return;
    }

    try {
      setIsCheckingIn(true);
      setCheckInStatus(null);
      const response = await api.post("/api/v1/receptionist/check-in", {
        patient_id: selectedPatient.patient_id,
        doctor_id: Number(selectedDoctorId)
      });
      setCheckInStatus({
        type: "success",
        message: response.data.message || "Patient checked in successfully!"
      });
      // Refresh statistics after check-in
      fetchStats();
      // Reset selections
      setSelectedPatient(null);
      setSearchQuery("");
      setSearchResults([]);
    } catch (err: any) {
      console.error(err);
      setCheckInStatus({
        type: "error",
        message: err.response?.data?.message || "Failed to check in patient."
      });
    } finally {
      setIsCheckingIn(false);
    }
  };

  const openCheckInForDoctor = (doctorId: number) => {
    setSelectedDoctorId(doctorId);
    setCheckInStatus(null);
    setSelectedPatient(null);
    setSearchQuery("");
    setSearchResults([]);
    setIsCheckInModalOpen(true);
  };

  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
        <p className="text-slate-500 text-sm mt-4">Loading organization dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1000px] mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="mx-auto text-red-500 mb-2" size={32} />
          <h2 className="text-red-800 font-bold text-lg">Failed to Load Dashboard</h2>
          <p className="text-red-600 text-sm mt-1 mb-4">{error}</p>
          <div className="flex justify-center gap-4">
            <button onClick={fetchStats} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem", color: "#000000", fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Welcome Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#000000", letterSpacing: "-0.025em", margin: 0 }}>
            {stats?.organization?.name || "Clinic Dashboard"}
          </h1>
          <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#475569", marginTop: "0.375rem" }}>
            Welcome back, Receptionist. Here's a live overview of today's logs.
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedDoctorId("");
            setCheckInStatus(null);
            setSelectedPatient(null);
            setSearchQuery("");
            setSearchResults([]);
            setIsCheckInModalOpen(true);
          }}
          className="btn-light-blue"
          style={{ padding: "0.75rem 1.5rem", borderRadius: "0.75rem" }}
        >
          <Plus size={16} />
          <span>New Check-in</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1.5rem" }}>
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.75rem" }}>
          <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "#eff6ff" }}>
            <Users size={24} style={{ color: "#2563eb" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Total Patients</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#000000", lineHeight: 1, letterSpacing: "-0.025em", margin: 0 }}>{stats?.totalPatients || 0}</p>
            <p style={{ fontSize: "0.84375rem", color: "#64748b", fontWeight: 500, margin: 0 }}>All active records</p>
          </div>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.75rem" }}>
          <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "#fffbeb" }}>
            <UserPlus size={24} style={{ color: "#d97706" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Registered Today</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#000000", lineHeight: 1, letterSpacing: "-0.025em", margin: 0 }}>{stats?.newPatientsToday || 0}</p>
            <p style={{ fontSize: "0.84375rem", color: "#64748b", fontWeight: 500, margin: 0 }}>New registrations</p>
          </div>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.75rem" }}>
          <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "#f0fdf4" }}>
            <Activity size={24} style={{ color: "#059669" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Checked In Today</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#000000", lineHeight: 1, letterSpacing: "-0.025em", margin: 0 }}>{stats?.totalConsultationsToday || 0}</p>
            <p style={{ fontSize: "0.84375rem", color: "#64748b", fontWeight: 500, margin: 0 }}>Consultation visits</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (Doctors List), Right (Recent Patients & Org Details) */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        
        {/* Left Column: Doctors Availability */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1875rem", fontWeight: 800, color: "#000000", margin: 0 }}>Doctors & Daily Loads</h3>
              <p style={{ fontSize: "0.84375rem", color: "#64748b", margin: "0.25rem 0 0 0" }}>Assigned patient consultation count for today.</p>
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#1e40af", backgroundColor: "#dbeafe", padding: "0.25rem 0.625rem", borderRadius: "9999px", textTransform: "uppercase" }}>
              Active Now
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {stats?.doctorStats?.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2.5rem 0", color: "#64748b", fontSize: "0.875rem" }}>
                No active doctors registered for this organization.
              </div>
            ) : (
              stats?.doctorStats?.map((doc: any, index: number) => (
                <div key={doc.doctor_id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", paddingBottom: "1.25rem", borderBottom: index < stats.doctorStats.length - 1 ? "1px solid #e2e8f0" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#475569" }}>
                      {doc.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#000000", margin: 0 }}>Dr. {doc.name}</h4>
                      <p style={{ fontSize: "0.8125rem", color: "#64748b", margin: "0.125rem 0 0 0" }}>{doc.email}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: 0 }}>Patients today</p>
                      <p style={{ fontSize: "1.0625rem", fontWeight: 800, color: "#000000", margin: 0 }}>{doc.consultations_count}</p>
                    </div>
                    <button
                      onClick={() => openCheckInForDoctor(doc.doctor_id)}
                      className="btn-light-outline"
                      style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem" }}
                    >
                      Check-in Patient
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Organization Details & Recent Patients */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Organization Details */}
          {stats?.organization && (
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", backgroundColor: "#eff6ff", border: "1px solid #cbd1da", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                  <Building2 size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000", margin: 0 }}>{stats.organization.name}</h4>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e40af", textTransform: "uppercase", marginTop: "0.125rem", display: "inline-block" }}>Your Center</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.8125rem", color: "#475569", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
                {stats.organization.address && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <span>📍</span>
                    <span>{stats.organization.address}</span>
                  </div>
                )}
                {stats.organization.phone && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Phone size={12} style={{ color: "#64748b" }} />
                    <span>{stats.organization.phone}</span>
                  </div>
                )}
                {stats.organization.website && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Globe size={12} style={{ color: "#64748b" }} />
                    <a href={stats.organization.website} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>
                      {stats.organization.website.replace(/(^\w+:|^)\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Registrations */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.0625rem", fontWeight: 800, color: "#000000", margin: 0 }}>Recent Registrations</h3>
            <p style={{ fontSize: "0.84375rem", color: "#64748b", margin: "0.25rem 0 1.25rem 0" }}>Last 5 patients added to records.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {stats?.recentPatients?.length === 0 ? (
                <div style={{ textAlign: "center", padding: "1rem 0", color: "#64748b", fontSize: "0.8125rem" }}>No recent patients.</div>
              ) : (
                stats?.recentPatients?.map((patient: any, index: number) => (
                  <div key={patient.patient_id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: index < stats.recentPatients.length - 1 ? "0.75rem" : "0", borderBottom: index < stats.recentPatients.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <div>
                      <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#000000", margin: 0 }}>{patient.name}</h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem", fontSize: "0.75rem", color: "#64748b" }}>
                        <span style={{ fontFamily: "monospace", color: "#1e40af", backgroundColor: "#eff6ff", padding: "0.125rem 0.375rem", borderRadius: "0.25rem", fontWeight: 700 }}>
                          {patient.patient_code}
                        </span>
                        <span>•</span>
                        <span>{patient.gender}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>
                      {new Date(patient.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* QUICK CHECK-IN MODAL */}
      {isCheckInModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}>
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Check-In Consultation</h3>
                <p className="text-slate-500 text-xs">Assign a registered patient to a clinic doctor.</p>
              </div>
              <button
                onClick={() => setIsCheckInModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {checkInStatus && (
                <div className={`p-3 rounded-xl border text-xs font-semibold mb-4 flex items-start gap-2 ${
                  checkInStatus.type === "success" 
                    ? "bg-blue-50 border-blue-100 text-blue-800" 
                    : "bg-red-50 border-red-100 text-red-800"
                }`}>
                  {checkInStatus.type === "success" ? <CheckCircle size={14} className="mt-0.5" /> : <AlertCircle size={14} className="mt-0.5" />}
                  <span>{checkInStatus.message}</span>
                </div>
              )}

              {/* Step 1: Search Patient */}
              {!selectedPatient ? (
                <div>
                  <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">
                    Search Patient
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="light-select text-xs w-28 bg-slate-50 border-slate-200"
                      style={{ height: "38px" }}
                    >
                      <option value="patient_id">ID Code</option>
                      <option value="nic">NIC</option>
                      <option value="phone">Phone</option>
                    </select>

                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter search value..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSearchPatients();
                        }}
                        className="light-input text-xs"
                        style={{ height: "38px" }}
                      />
                      <button
                        onClick={handleSearchPatients}
                        disabled={isSearching}
                        className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                      >
                        <Search size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Search Results List */}
                  <div className="mt-4 max-h-48 overflow-y-auto border border-slate-100 rounded-xl divide-y divide-slate-100">
                    {isSearching ? (
                      <div className="p-4 text-center text-slate-400 text-xs">Searching patients...</div>
                    ) : searchResults.length === 0 ? (
                      searchQuery.trim() ? (
                        <div className="p-4 text-center text-slate-400 text-xs">No patients found.</div>
                      ) : (
                        <div className="p-4 text-center text-slate-400 text-xs">Search for a patient to begin.</div>
                      )
                    ) : (
                      searchResults.map((p) => (
                        <button
                          key={p.patient_id}
                          type="button"
                          onClick={() => {
                            setSelectedPatient(p);
                            setCheckInStatus(null);
                          }}
                          className="w-full text-left p-3 text-xs hover:bg-slate-50 flex justify-between items-center"
                        >
                          <div>
                            <span className="font-bold text-slate-800 block">{p.name}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{p.patient_code}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] uppercase font-bold">
                            Select
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                /* Selected Patient Info Card */
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Selected Patient</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-0.5">{selectedPatient.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{selectedPatient.patient_code}</span>
                  </div>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-xs text-red-500 font-bold hover:underline"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Form to submit Check-in */}
              <form onSubmit={handleCheckInSubmit} className="mt-4">
                <div className="mb-4">
                  <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">
                    Assign Doctor
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value === "" ? "" : Number(e.target.value))}
                    required
                    className="light-select text-xs"
                    style={{ height: "38px" }}
                  >
                    <option value="">Choose a Doctor...</option>
                    {stats?.doctorStats?.map((doc: any) => (
                      <option key={doc.doctor_id} value={doc.doctor_id}>
                        Dr. {doc.name} ({doc.consultations_count} today)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCheckInModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCheckingIn || !selectedPatient || !selectedDoctorId}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
