"use client";

import { User } from "lucide-react";

interface PatientProps {
  name?: string;
  patient_code?: string;
  date_of_birth?: string | Date;
}

interface BannerProps {
  patient: PatientProps;
  visitDate: string;
  diagnoses: string[];
  allergies: string[];
}

export default function PatientPrescriptionBanner({
  patient,
  visitDate,
  diagnoses,
  allergies,
}: BannerProps) {
  return (
    <div className="bg-white border border-[#cbd1da] rounded p-6 mb-6 text-[#0f172a]">
      <div className="flex flex-wrap gap-6 justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded bg-[#f1f5f9] border border-[#cbd1da] grid place-items-center flex-shrink-0 text-[#0f172a]">
            <User size={22} />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0f172a]">{patient?.name || "-"}</h3>
            <p className="text-xs font-extrabold text-[#334155] mt-0.5">
              Patient ID: <span className="font-mono text-[#1d4ed8] font-black">{patient?.patient_code || "-"}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1 max-w-[650px]">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0f172a]">Date of Birth</span>
            <p className="text-xs font-black text-[#0f172a] mt-1">
              {patient?.date_of_birth ? String(patient.date_of_birth).slice(0, 10) : "-"}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0f172a]">Visit Date</span>
            <p className="text-xs font-black text-[#0f172a] mt-1">
              {String(visitDate).slice(0, 10)}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0f172a]">Diagnosis</span>
            <p className="text-xs font-black text-[#0f172a] mt-1">
              {diagnoses[0] || "Viral Fever"}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0f172a]">Allergies</span>
            <p className="text-xs font-black text-[#dc2626] mt-1">
              {allergies.length > 0 ? allergies.join(", ") : "None recorded"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
