"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import {
  Users,
  Stethoscope,
  FileText,
  Receipt,
  Calendar as CalendarIcon,
  Plus,
  Clock,
} from "lucide-react";

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Dashboard state metrics
  const [stats, setStats] = useState({
    todayConsultations: 0,
    totalPatients: 0,
    totalPrescriptions: 0,
    todayRevenue: 0,
  });
  const [recentConsultations, setRecentConsultations] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      router.push("/");
    } else {
      setCurrentUser(JSON.parse(userString));
      setIsCheckingAuth(false);
    }
  }, [router]);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Counts are computed server-side so the dashboard stays fast as history grows
        const { data } = await api.get("/consultations/summary");

        setStats({
          todayConsultations: data.todayConsultations,
          totalPatients: data.totalPatients,
          totalPrescriptions: data.totalPrescriptions,
          todayRevenue: data.todayRevenue,
        });

        setRecentConsultations(data.recentConsultations);
      } catch (error) {
        console.error("Failed to load dashboard parameters:", error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchDashboardData();
    }
  }, []);


  if (isCheckingAuth) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
        <p className="text-slate-500 text-sm mt-4">Verifying session...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        
        /* Modernized Styles for Dashboard Cards */
        .metric-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
          border-color: #cbd5e1;
        }
        .metric-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        /* Color themes for metrics */
        .metric-blue { background-color: #eff6ff; border: 1px solid #dbeafe; color: #1d4ed8; }
        .metric-indigo { background-color: #eef2ff; border: 1px solid #e0e7ff; color: #4338ca; }
        .metric-amber { background-color: #fffbeb; border: 1px solid #fef3c7; color: #b45309; }
        .metric-emerald { background-color: #ecfdf5; border: 1px solid #d1fae5; color: #047857; }

        /* Quick actions custom cards */
        .quick-action-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.25rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }
        .quick-action-card:hover {
          background-color: #f8fafc;
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
        }
        .quick-action-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f1f5f9;
          color: #64748b;
          transition: all 0.2s ease;
        }
        .quick-action-card:hover .quick-action-circle {
          background-color: #3b82f6;
          color: #ffffff;
        }
      `}</style>

      <div className="dr-page-header">
        <div>
          <h1 className="dr-page-title" style={{ margin: 0, letterSpacing: "-0.025em" }}>Clinic Overview</h1>
          <p className="text-slate-500 text-xs mt-1">Hello, Dr. {currentUser?.name || "Sarah Bennett"}. Check key clinical parameters and patient schedules today.</p>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "10rem 0" }}>
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-slate-400 text-xs mt-4">Loading clinic analytics...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 2x2 Metrics Grid - Explicit 2 Columns */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.25rem" }}>
            {/* Card 1: Today's Consultations */}
            <div className="metric-card">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Today's Visits</span>
                <h3 className="text-3xl font-black text-slate-800 mt-1 tracking-tight">{stats.todayConsultations}</h3>
                <div className="text-[10px] text-blue-600 font-bold mt-2">
                  <span>Active Clinic Queue</span>
                </div>
              </div>
              <div className="metric-icon-wrap metric-blue">
                <Stethoscope size={22} />
              </div>
            </div>

            {/* Card 2: Total Active Patients */}
            <div className="metric-card">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total Patients</span>
                <h3 className="text-3xl font-black text-slate-800 mt-1 tracking-tight">{stats.totalPatients}</h3>
                <div className="text-[10px] text-indigo-600 font-bold mt-2">
                  <span>Registered Profiles</span>
                </div>
              </div>
              <div className="metric-icon-wrap metric-indigo">
                <Users size={22} />
              </div>
            </div>

            {/* Card 3: Total Prescriptions */}
            <div className="metric-card">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Prescriptions</span>
                <h3 className="text-3xl font-black text-slate-800 mt-1 tracking-tight">{stats.totalPrescriptions}</h3>
                <div className="text-[10px] text-amber-600 font-bold mt-2">
                  <span>Issued Records</span>
                </div>
              </div>
              <div className="metric-icon-wrap metric-amber">
                <FileText size={22} />
              </div>
            </div>

            {/* Card 4: Daily Revenue */}
            <div className="metric-card">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Today's Revenue</span>
                <h3 className="text-2xl font-black text-slate-800 mt-1.5 tracking-tight">LKR {stats.todayRevenue.toFixed(2)}</h3>
                <div className="text-[10px] text-emerald-600 font-bold mt-2">
                  <span>Billing Statements</span>
                </div>
              </div>
              <div className="metric-icon-wrap metric-emerald">
                <Receipt size={22} />
              </div>
            </div>
          </div>

          {/* 3-Column Content Layout Split (Original View) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 Columns: Recent Consultations Table */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6">
                <div className="mb-4">
                  <h3 className="font-extrabold text-slate-800 text-sm">Recent Consultations</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Quick lookup table for recent patient check-in records.</p>
                </div>

                {recentConsultations.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    No consultations have been created yet. Click "Start Consultation" in Quick Actions to begin.
                  </div>
                ) : (
                  <div className="light-table-container">
                    <table className="light-table">
                      <thead>
                        <tr>
                          <th>Patient ID</th>
                          <th>Patient Name</th>
                          <th>Check In Time</th>
                          <th>Chief Complaint</th>
                          <th style={{ textAlign: "right" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentConsultations.map((c: any) => (
                          <tr key={c.consultation_id}>
                            <td className="light-table-code">{c.patient?.patient_code}</td>
                            <td className="light-table-name">{c.patient?.name}</td>
                            <td>
                              <div className="flex items-center gap-1 text-slate-600 text-xs">
                                <Clock size={12} className="text-slate-400" />
                                <span>{new Date(c.visit_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </td>
                            <td>
                              <span className="text-slate-700 font-semibold truncate max-w-[150px] inline-block">
                                {c.chief_complaint || "General consultation"}
                              </span>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <button
                                onClick={() => router.push(`/doctor/opd/${c.consultation_id}`)}
                                className="btn-light-outline"
                                style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                              >
                                View Records
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Right 1 Column: Quick Action Shortcuts */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6 space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">Quick Actions</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Shortcuts to perform common tasks in Medicare.</p>
                </div>

                <div className="space-y-3">
                  <div
                    onClick={() => router.push("/doctor/opd")}
                    className="quick-action-card"
                  >
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800">Start OPD Case</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Check-in and consultation logs flow.</p>
                    </div>
                    <div className="quick-action-circle">
                      <Plus size={16} />
                    </div>
                  </div>

                  <div
                    onClick={() => router.push("/doctor/patients")}
                    className="quick-action-card"
                  >
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800">Patient Directory</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Manage details and medical history.</p>
                    </div>
                    <div className="quick-action-circle">
                      <Users size={16} />
                    </div>
                  </div>

                  <div
                    onClick={() => router.push("/doctor/calendar")}
                    className="quick-action-card"
                  >
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800">Clinic Calendar</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Visits highlighting and logs list.</p>
                    </div>
                    <div className="quick-action-circle">
                      <CalendarIcon size={16} />
                    </div>
                  </div>

                  <div
                    onClick={() => router.push("/doctor/invoice")}
                    className="quick-action-card"
                  >
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800">Invoices & Statements</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Historical records and payments logs.</p>
                    </div>
                    <div className="quick-action-circle">
                      <Receipt size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
