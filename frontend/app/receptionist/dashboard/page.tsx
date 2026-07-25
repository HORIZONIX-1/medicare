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
    <div className="max-w-[1200px] mx-auto p-4 md:p-6" style={{ fontFamily: "inherit" }}>
      {/* Upper Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <span className="text-emerald-600 text-xs font-bold tracking-wider uppercase">Portal Overview</span>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-1">
            {stats?.organization?.name || "Clinic Dashboard"}
          </h1>
          <p className="text-slate-500 text-sm">
            Manage check-ins, patient registration, and view real-time daily loading logs.
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
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition-all"
        >
          <Plus size={16} />
          <span>New Check-in</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Patients</span>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-0.5">{stats?.totalPatients || 0}</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <UserPlus size={24} />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Registered Today</span>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-0.5">{stats?.newPatientsToday || 0}</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Activity size={24} />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Checked In Today</span>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-0.5">{stats?.totalConsultationsToday || 0}</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Doctors List), Right Column (Recent Patients & Org details) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doctors availability list */}
        <div className="lg:col-span-2 bg-white border border-slate-150 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="font-extrabold text-slate-800 text-base">Doctors & Daily Loads</h2>
              <p className="text-slate-500 text-xs">Assigned patient consultation count for today.</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
              Active Now
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {stats?.doctorStats?.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No active doctors registered for this organization.
              </div>
            ) : (
              stats?.doctorStats?.map((doc: any) => (
                <div key={doc.doctor_id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50/30 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                      {doc.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Dr. {doc.name}</h4>
                      <p className="text-slate-500 text-xs">{doc.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Patients today</span>
                      <span className="font-extrabold text-slate-800 text-base">{doc.consultations_count}</span>
                    </div>

                    <button
                      onClick={() => openCheckInForDoctor(doc.doctor_id)}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-emerald-50 hover:text-emerald-700 transition"
                    >
                      Check-in Patient
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column: Recent Patient list and Organization Info */}
        <div className="flex flex-col gap-6">
          {/* Organization detail card */}
          {stats?.organization && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-sm border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-100">{stats.organization.name}</h4>
                  <span className="text-[10px] bg-slate-800 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase">
                    Your Center
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                {stats.organization.address && (
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500 mt-0.5">📍</span>
                    <span>{stats.organization.address}</span>
                  </div>
                )}
                {stats.organization.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-slate-500" />
                    <span>{stats.organization.phone}</span>
                  </div>
                )}
                {stats.organization.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={12} className="text-slate-500" />
                    <a href={stats.organization.website} target="_blank" rel="noreferrer" className="hover:underline text-emerald-400">
                      {stats.organization.website.replace(/(^\w+:|^)\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Registrations list */}
          <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6">
            <div className="mb-4">
              <h3 className="font-extrabold text-slate-800 text-sm">Recent Registrations</h3>
              <p className="text-slate-500 text-xs">Last 5 patients added to records.</p>
            </div>

            <div className="space-y-4">
              {stats?.recentPatients?.length === 0 ? (
                <div className="text-center text-slate-400 text-xs py-4">No recent patients.</div>
              ) : (
                stats?.recentPatients?.map((patient: any) => (
                  <div key={patient.patient_id} className="flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-slate-800">{patient.name}</h4>
                      <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                        <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                          {patient.patient_code}
                        </span>
                        <span>•</span>
                        <span>{patient.gender}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
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
                    ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
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
