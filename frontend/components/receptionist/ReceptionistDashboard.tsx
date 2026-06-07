"use client";
import React from "react";
import Link from "next/link";

type Patient = {
  id: string;
  name: string;
  phone: string;
  registeredOn: string;
};

const samplePatients: Patient[] = [
  { id: "P10045", name: "Saman Perera", phone: "077 123 4567", registeredOn: "2024-05-16T10:30:00" },
  { id: "P10044", name: "Nimal Jayawardena", phone: "071 234 5678", registeredOn: "2024-05-16T09:45:00" },
  { id: "P10043", name: "Dilini Fernando", phone: "076 345 6789", registeredOn: "2024-05-16T09:20:00" },
  { id: "P10042", name: "Kavindu Silva", phone: "070 456 7890", registeredOn: "2024-05-16T08:50:00" },
  { id: "P10041", name: "Amal Perera", phone: "077 567 8901", registeredOn: "2024-05-15T17:15:00" },
];

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function ReceptionistDashboard() {
  const totalToday = 126;
  const newRegistrations = 18;
  const totalPatients = 4562;

  return (
    <div className="main-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold">Receptionist Dashboard</h1>
          <p className="muted mt-1">Overview of today's patient activity</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card card-modern p-6">
          <div className="card-title">Total Patients Today</div>
          <div className="card-number text-3xl font-bold mt-2">{totalToday}</div>
        </div>
        <div className="card card-modern p-6">
          <div className="card-title">New Registrations Today</div>
          <div className="card-number text-3xl font-bold mt-2">{newRegistrations}</div>
        </div>
        <div className="card card-modern p-6">
          <div className="card-title">Total Patients in System</div>
          <div className="card-number text-3xl font-bold mt-2">{totalPatients.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link href="/receptionist/patients/register" className="card p-6 flex items-center gap-4 hover:shadow-lg">
          <div className="w-16 h-16 rounded-full bg-slate-100/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M15 14c2.761 0 5 2.239 5 5v1H4v-1c0-2.761 2.239-5 5-5h6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 6h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="text-lg font-semibold">Register Patient</div>
            <div className="muted">Add a new patient</div>
          </div>
        </Link>

        <Link href="/receptionist/patients" className="card p-6 flex items-center gap-4 hover:shadow-lg">
          <div className="w-16 h-16 rounded-full bg-slate-100/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-lg font-semibold">Search Patient</div>
            <div className="muted">Find existing patient</div>
          </div>
        </Link>
      </div>

      <div id="recent-patients" className="card card-dark p-6 mb-6 scroll-mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="card-title">Recent Patients</div>
          <Link href="/receptionist/patients" className="btn btn-cyan">View All</Link>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr className="text-slate-400 text-sm" style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <th className="py-3">Patient ID</th>
                <th className="py-3">Name</th>
                <th className="py-3">Phone</th>
                <th className="py-3">Registered On</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {samplePatients.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td className="py-3 text-slate-100">{p.id}</td>
                  <td className="py-3">{p.name}</td>
                  <td className="py-3 muted">{p.phone}</td>
                  <td className="py-3 muted">{formatDate(p.registeredOn)}</td>
                  <td className="py-3">
                    <Link href={`/receptionist/patients/${p.id}`} className="btn btn-ghost">
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
