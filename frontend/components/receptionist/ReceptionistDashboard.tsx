"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

type Patient = {
  patient_id: number;
  patient_code: string;
  name: string;
  phone?: string;
  created_at: string;
};

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
}

export default function ReceptionistDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const totalToday = 126;
  const newRegistrations = 18;
  const totalPatients = 4562;

  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.get("/patients");
        setPatients(res.data || []);
      } catch (error) {
        console.error("Failed to load patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="main-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold">Receptionist Dashboard</h1>
          <p className="muted mt-1">Overview of today's patient activity</p>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card card-modern p-6">
          <div className="card-title">Total Patients Today</div>
          <div className="card-number text-3xl font-bold mt-2">{totalToday}</div>
        </div>

        <div className="card card-modern p-6">
          <div className="card-title">New Registrations Today</div>
          <div className="card-number text-3xl font-bold mt-2">
            {newRegistrations}
          </div>
        </div>

        <div className="card card-modern p-6">
          <div className="card-title">Total Patients in System</div>
          <div className="card-number text-3xl font-bold mt-2">
            {totalPatients.toLocaleString()}
          </div>
        </div>
      </div>

      {/* SHORTCUTS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link href="/receptionist/patients/register" className="card p-6 flex items-center gap-4 hover:shadow-lg">
          Register Patient
        </Link>

        <Link href="/receptionist/patients" className="card p-6 flex items-center gap-4 hover:shadow-lg">
          Search Patient
        </Link>
      </div>

      {/* RECENT PATIENTS */}
      <div className="card card-dark p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="card-title">Recent Patients</div>
          <Link href="/receptionist/patients" className="btn btn-cyan">
            View All
          </Link>
        </div>

        {loading ? (
          <p className="muted">Loading patients...</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-sm text-left border-b border-white/10">
                  <th className="py-3">Patient ID</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Phone</th>
                  <th className="py-3">Registered On</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {patients.slice(0, 5).map((p) => (
                  <tr key={p.patient_id} className="border-b border-white/5">
                    <td className="py-3">{p.patient_code}</td>
                    <td className="py-3">{p.name}</td>
                    <td className="py-3">{p.phone || "-"}</td>
                    <td className="py-3">{formatDate(p.created_at)}</td>
                    <td className="py-3">
                      <Link
                        href={`/receptionist/patients/${p.patient_id}`}
                        className="btn btn-ghost"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}