"use client";

import { Patient } from "@/types/patient";
import { useRouter } from "next/navigation";

interface Props {
  patients: Patient[];
}

export default function PatientTable({ patients }: Props) {
  const router = useRouter();

  return (
    <div className="p-6">
      <h3 className="text-sm font-extrabold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span>📋</span> 2. Search Results
      </h3>

      {patients.length === 0 ? (
        <div className="text-center py-10 bg-slate-950/40 border border-slate-800/40 rounded-2xl p-6">
          <span className="text-3xl block mb-2 opacity-60">📁</span>
          <p className="text-sm font-semibold text-slate-300">No Patients Displayed</p>
          <p className="text-xs text-slate-500 mt-1">Submit a search query above to fetch record matches from the clinic base.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-900 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Patient Code</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">NIC</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800 bg-slate-900/10">
              {patients.map((patient) => (
                <tr
                  key={patient.patient_id}
                  className="hover:bg-slate-800/30 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-indigo-400">
                    {patient.patient_code}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {patient.nic || "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {patient.phone || "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => router.push(`/doctor/patients/${patient.patient_id}`)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700/60 transition-all duration-150"
                      >
                        Open Profile
                      </button>

                      <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-150 shadow-md shadow-indigo-600/10">
                        Start Visit
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
  );
}