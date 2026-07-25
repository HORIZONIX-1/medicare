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
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #cbd1da", borderRadius: "0.75rem", padding: "1.75rem", marginBottom: "1.5rem", color: "#000000", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyBetween: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "0.5rem", backgroundColor: "#f1f5f9", border: "1px solid #cbd1da", display: "grid", placeItems: "center", flexShrink: 0, color: "#000000" }}>
            <User size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#000000", margin: 0 }}>{patient?.name || "-"}</h3>
            <p style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000", marginTop: "0.25rem" }}>
              Patient ID: <span style={{ fontFamily: "monospace", color: "#1d4ed8", fontWeight: 900 }}>{patient?.patient_code || "-"}</span>
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "1.5rem", flex: 1, maxWidth: "700px" }}>
          <div>
            <span style={{ fontSize: "0.78125rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000" }}>Date of Birth</span>
            <p style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#000000", marginTop: "0.375rem" }}>
              {patient?.date_of_birth ? String(patient.date_of_birth).slice(0, 10) : "-"}
            </p>
          </div>
          <div>
            <span style={{ fontSize: "0.78125rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000" }}>Visit Date</span>
            <p style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#000000", marginTop: "0.375rem" }}>
              {String(visitDate).slice(0, 10)}
            </p>
          </div>
          <div>
            <span style={{ fontSize: "0.78125rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000" }}>Diagnosis</span>
            <p style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#000000", marginTop: "0.375rem" }}>
              {diagnoses[0] || "Viral Fever"}
            </p>
          </div>
          <div>
            <span style={{ fontSize: "0.78125rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000" }}>Allergies</span>
            <p style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#dc2626", marginTop: "0.375rem" }}>
              {allergies.length > 0 ? allergies.join(", ") : "None recorded"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
