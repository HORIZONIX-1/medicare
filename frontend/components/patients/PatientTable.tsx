"use client";

import { Patient } from "@/types/patient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/axios";

interface Props {
  patients: Patient[];
}

export default function PatientTable({ patients }: Props) {
  const router = useRouter();
  const [startingVisit, setStartingVisit] = useState<string | null>(null);

  const handleStartVisit = async (patientId: number) => {
    try {
      setStartingVisit(String(patientId));
      const response = await api.post("/consultations/start", {
        patient_id: patientId,
      });
      const consultationId = response.data.consultation_id;
      router.push(`/doctor/opd/${consultationId}`);
    } catch (error) {
      console.error("Failed to start consultation:", error);
      alert("Failed to start visit. Please try again.");
      setStartingVisit(null);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {patients.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "2.5rem 1.5rem",
          backgroundColor: "#f8fafc",
          border: "1px dashed #cbd5e1",
          borderRadius: "0.5rem"
        }}>
          <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem", opacity: 0.6 }}>📁</span>
          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#475569" }}>No Patients Displayed</p>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>
            Submit a search query above to fetch record matches from the clinic base.
          </p>
        </div>
      ) : (
        <div className="light-table-container">
          <table className="light-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>NIC</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Last Visit</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.patient_id}>
                  <td className="light-table-code">
                    {patient.patient_code}
                  </td>
                  <td className="light-table-name">
                    {patient.name}
                  </td>
                  <td>
                    {patient.nic || "—"}
                  </td>
                  <td>
                    {patient.phone || "—"}
                  </td>
                  <td>
                    {patient.date_of_birth ? patient.date_of_birth.split("T")[0] : "—"}
                  </td>
                  <td>
                    {(patient as any).last_visit || "—"}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => router.push(`/doctor/patients/${patient.patient_id}`)}
                        className="btn-light-outline"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={() => handleStartVisit(patient.patient_id)}
                        disabled={startingVisit !== null}
                        className="btn-light-select"
                        style={{ minWidth: "80px" }}
                      >
                        {startingVisit === String(patient.patient_id) ? "Starting..." : "Select"}
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