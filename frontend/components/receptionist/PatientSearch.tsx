"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

type Patient = {
  id: string;
  name: string;
  phone: string;
  registeredOn?: string;
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

export default function PatientSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return samplePatients;
    return samplePatients.filter((p) => {
      return (
        p.id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Patient Search</h2>

      <div className="mb-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Patient ID, NIC, Phone or Name..."
            className="input input-bordered w-full pl-10"
            aria-label="Search patients"
          />
        </div>
        <div className="text-sm muted mt-2">You can enter partial information to search</div>
      </div>

      <div className="card p-0 mb-6">
        <div style={{ overflowX: "auto" }}>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr className="text-slate-400 text-sm" style={{ textAlign: "left", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <th className="py-3">Name</th>
                <th className="py-3">Patient ID</th>
                <th className="py-3">Phone</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <td className="py-3">{p.name}</td>
                  <td className="py-3">{p.id}</td>
                  <td className="py-3 muted">{p.phone}</td>
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

      {results.length === 0 && (
        <div className="border-dashed border-2 border-slate-200 rounded p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-slate-100/50 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 20v-1a6 6 0 0112 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="font-semibold">No patient found</div>
            <Link href="/receptionist/patients/register" className="btn btn-outline">Register New Patient</Link>
          </div>
        </div>
      )}
    </div>
  );
}
