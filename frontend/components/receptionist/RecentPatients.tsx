"use client";

import Link from "next/link";

type Patient = {
  id: string;
  name: string;
  phone: string;
  registeredOn: string;
};

const recentPatients: Patient[] = [
  { id: "P10045", name: "Saman Perera", phone: "077 123 4567", registeredOn: "2024-05-16T10:30:00" },
  { id: "P10044", name: "Nimal Jayawardena", phone: "071 234 5678", registeredOn: "2024-05-16T09:45:00" },
  { id: "P10043", name: "Dilini Fernando", phone: "076 345 6789", registeredOn: "2024-05-16T09:20:00" },
  { id: "P10042", name: "Kavindu Silva", phone: "070 456 7890", registeredOn: "2024-05-16T08:50:00" },
  { id: "P10041", name: "Amal Perera", phone: "077 567 8901", registeredOn: "2024-05-15T17:15:00" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export default function RecentPatients() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold">Recent Patients</h1>
          <p className="muted mt-1">Recently visited patients only</p>
        </div>
        <Link href="/receptionist/patients" className="btn btn-ghost">
          Search Patients
        </Link>
      </div>

      <div className="card card-dark p-6">
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
              {recentPatients.map((patient) => (
                <tr key={patient.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td className="py-3 text-slate-100">{patient.id}</td>
                  <td className="py-3">{patient.name}</td>
                  <td className="py-3 muted">{patient.phone}</td>
                  <td className="py-3 muted">{formatDate(patient.registeredOn)}</td>
                  <td className="py-3">
                    <Link href={`/receptionist/patients/${patient.id}`} className="btn btn-ghost">
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
