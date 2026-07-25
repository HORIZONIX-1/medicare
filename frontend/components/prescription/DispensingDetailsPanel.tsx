"use client";

import React from "react";
import { Calendar, User, AlertTriangle, FileText } from "lucide-react";

export interface SelectedPrescriptionData {
  id: number;
  date: string;
  patientName?: string;
  name?: string;
  patientId?: string;
  pid?: string;
  prescriptionId?: string;
  age: string;
  gender: string;
  diagnosis: string;
  doctor: string;
  dispenser?: string;
  drugs: any[];
  alerts?: string[];
  notes?: string;
}

interface Props {
  selectedItem: SelectedPrescriptionData | null;
  customNotes?: string;
  onNotesChange?: (notes: string) => void;
  isHistory?: boolean;
}

export default function DispensingDetailsPanel({
  selectedItem,
  customNotes = "",
  onNotesChange,
  isHistory = false,
}: Props) {
  if (!selectedItem) {
    return (
      <div style={{ backgroundColor: "#ffffff", border: "1px solid #cbd1da", borderRadius: "0.75rem", padding: "1.75rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "620px", color: "#000000", fontFamily: "'Poppins', sans-serif" }}>
        <FileText size={48} style={{ color: "#000000", marginBottom: "0.75rem" }} />
        <p style={{ fontSize: "0.9375rem", fontWeight: 800 }}>Select a prescription record from the list to view details.</p>
      </div>
    );
  }

  const patientName = selectedItem.patientName || selectedItem.name || "Patient";
  const patientCode = selectedItem.patientId || selectedItem.pid || "-";

  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #cbd1da", borderRadius: "0.75rem", padding: "1.75rem", display: "flex", flexDirection: "column", minHeight: "620px", color: "#000000", fontFamily: "'Poppins', sans-serif" }}>
      <h3 style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.25rem", borderBottom: "1px solid #cbd1da", paddingBottom: "0.625rem" }}>
        {isHistory ? "DISPENSED DETAILS" : "PRESCRIPTION DETAILS"}
      </h3>
      
      {/* Patient Info Banner */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.5rem", backgroundColor: "#f1f5f9", border: "1px solid #cbd1da", display: "flex", alignItems: "center", justifyContent: "center", color: "#000000", flexShrink: 0 }}>
            <User size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.1875rem", fontWeight: 900, color: "#000000", margin: 0, lineHeight: 1.2 }}>{patientName}</h2>
            <div style={{ fontSize: "0.875rem", fontWeight: 800, color: "#000000", display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
              <span style={{ fontFamily: "monospace", color: "#1d4ed8", fontWeight: 900 }}>{patientCode}</span>
              <span>•</span>
              <span>{selectedItem.age}</span>
              <span>•</span>
              <span>{selectedItem.gender}</span>
            </div>
          </div>
        </div>
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", display: "block", marginBottom: "0.25rem" }}>
            {isHistory ? "Dispensed Date" : "Prescription Date"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #cbd1da", borderRadius: "0.5rem", padding: "0.375rem 0.75rem", fontSize: "0.875rem", fontWeight: 900, color: "#000000", backgroundColor: "#f8fafc" }}>
            <span>{selectedItem.date}</span>
            <Calendar size={15} style={{ color: "#000000" }} />
          </div>
        </div>
      </div>

      {/* Diagnosis & Doctor / Dispenser */}
      <div style={{ display: "grid", gridTemplateColumns: isHistory ? "repeat(3, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))", gap: "0.875rem", marginBottom: "1.5rem" }}>
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", display: "block", marginBottom: "0.25rem" }}>Diagnosis</span>
          <div style={{ border: "1px solid #cbd1da", borderRadius: "0.5rem", padding: "0.625rem", fontSize: "0.875rem", fontWeight: 800, color: "#000000", backgroundColor: "#f8fafc" }}>
            {selectedItem.diagnosis}
          </div>
        </div>
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", display: "block", marginBottom: "0.25rem" }}>
            {isHistory ? "Doctor" : "Prescribing Doctor"}
          </span>
          <div style={{ border: "1px solid #cbd1da", borderRadius: "0.5rem", padding: "0.625rem", fontSize: "0.875rem", fontWeight: 800, color: "#000000", backgroundColor: "#f8fafc" }}>
            {selectedItem.doctor}
          </div>
        </div>
        {isHistory && selectedItem.dispenser && (
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", display: "block", marginBottom: "0.25rem" }}>Dispenser</span>
            <div style={{ border: "1px solid #cbd1da", borderRadius: "0.5rem", padding: "0.625rem", fontSize: "0.875rem", fontWeight: 800, color: "#000000", backgroundColor: "#f8fafc" }}>
              {selectedItem.dispenser}
            </div>
          </div>
        )}
      </div>

      {/* Prescribed Medicines */}
      <div style={{ flex: 1, marginBottom: "1.5rem", overflowY: "auto" }}>
        <h4 style={{ fontSize: "0.8125rem", fontWeight: 900, color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.625rem", borderBottom: "1px solid #cbd1da", paddingBottom: "0.375rem" }}>
          {isHistory ? "DISPENSED MEDICINES LOG" : "PRESCRIBED MEDICINES"}
        </h4>
        <div style={{ border: "1px solid #cbd1da", borderRadius: "0.5rem", overflow: "hidden" }}>
          <table style={{ width: "100%", fontSize: "0.875rem", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #cbd1da", fontSize: "0.78125rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", height: "2.5rem" }}>
                <th style={{ padding: "0 0.75rem", width: "2.5rem" }}>#</th>
                <th style={{ padding: "0 0.75rem" }}>DRUG NAME</th>
                {isHistory ? (
                  <>
                    <th style={{ padding: "0 0.75rem", textAlign: "center" }}>PRESCRIBED</th>
                    <th style={{ padding: "0 0.75rem", textAlign: "center" }}>DISPENSED</th>
                    <th style={{ padding: "0 0.75rem", textAlign: "right" }}>STATUS</th>
                  </>
                ) : (
                  <>
                    <th style={{ padding: "0 0.75rem" }}>STRENGTH / FORM</th>
                    <th style={{ padding: "0 0.75rem", width: "5rem", textAlign: "center" }}>QTY</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody style={{ fontWeight: 800, color: "#000000" }}>
              {selectedItem.drugs.map((drug: any, index: number) => {
                if (isHistory) {
                  const isPartial = drug.dispensedQty < drug.prescribedQty;
                  return (
                    <tr key={index} style={{ height: "3rem", borderBottom: "1px solid #cbd1da" }}>
                      <td style={{ padding: "0 0.75rem", fontWeight: 800, color: "#000000" }}>{index + 1}</td>
                      <td style={{ padding: "0 0.75rem" }}>
                        <p style={{ fontWeight: 900, fontSize: "0.9375rem", color: "#000000", margin: 0 }}>{drug.name}</p>
                        <p style={{ fontSize: "0.78125rem", color: "#000000", fontWeight: 800, margin: 0 }}>{drug.type}</p>
                      </td>
                      <td style={{ padding: "0 0.75rem", textAlign: "center", color: "#000000", fontWeight: 900, fontSize: "0.9375rem" }}>{drug.prescribedQty}</td>
                      <td style={{ padding: "0 0.75rem", textAlign: "center", fontWeight: 900, fontSize: "0.9375rem", color: isPartial ? "#b45309" : "#000000" }}>
                        {drug.dispensedQty}
                      </td>
                      <td style={{ padding: "0 0.75rem", textAlign: "right" }}>
                        {drug.dispensedQty === 0 ? (
                          <span style={{ display: "inline-flex", alignItems: "center", padding: "0.25rem 0.5rem", fontSize: "0.6875rem", fontWeight: 900, textTransform: "uppercase", borderRadius: "0.25rem", border: "1px solid #fca5a5", backgroundColor: "#fee2e2", color: "#991b1b" }}>
                            Out of Stock
                          </span>
                        ) : isPartial ? (
                          <span style={{ display: "inline-flex", alignItems: "center", padding: "0.25rem 0.5rem", fontSize: "0.6875rem", fontWeight: 900, textTransform: "uppercase", borderRadius: "0.25rem", border: "1px solid #fde68a", backgroundColor: "#fef3c7", color: "#78350f" }}>
                            Partial
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", padding: "0.25rem 0.5rem", fontSize: "0.6875rem", fontWeight: 900, textTransform: "uppercase", borderRadius: "0.25rem", border: "1px solid #a7f3d0", backgroundColor: "#d1fae5", color: "#065f46" }}>
                            Dispensed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={index} style={{ height: "2.875rem", borderBottom: "1px solid #cbd1da" }}>
                    <td style={{ padding: "0 0.75rem", fontWeight: 800, color: "#000000" }}>{index + 1}</td>
                    <td style={{ padding: "0 0.75rem", fontWeight: 900, fontSize: "0.9375rem", color: "#000000" }}>{drug.name}</td>
                    <td style={{ padding: "0 0.75rem", color: "#000000", fontWeight: 800, fontSize: "0.875rem" }}>{drug.strength} / {drug.type}</td>
                    <td style={{ padding: "0 0.75rem", textAlign: "center", fontWeight: 900, fontSize: "0.9375rem", color: "#1d4ed8" }}>{drug.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety Alerts */}
      {!isHistory && selectedItem.alerts && selectedItem.alerts.length > 0 && (
        <div style={{ display: "flex", gap: "0.75rem", padding: "0.875rem", border: "1px solid #fca5a5", borderRadius: "0.5rem", backgroundColor: "#fee2e2", marginBottom: "1rem", flexShrink: 0 }}>
          <AlertTriangle size={20} style={{ color: "#991b1b", marginTop: "0.125rem", flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "#991b1b", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.25rem" }}>SAFETY ALERTS</span>
            <ul style={{ fontSize: "0.875rem", fontWeight: 800, color: "#991b1b", paddingLeft: "1.25rem", margin: 0 }}>
              {selectedItem.alerts.map((alert: string, idx: number) => (
                <li key={idx}>{alert}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Notes */}
      <div style={{ marginBottom: "0.5rem", flexShrink: 0 }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", display: "block", marginBottom: "0.25rem" }}>
          {isHistory ? "DISPENSATION NOTES" : "NOTES (OPTIONAL)"}
        </span>
        {isHistory ? (
          <div style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd1da", borderRadius: "0.5rem", padding: "0.875rem", fontSize: "0.875rem", fontWeight: 800, color: "#000000", fontStyle: "italic" }}>
            {selectedItem.notes || "No custom notes entered during dispensation."}
          </div>
        ) : (
          <textarea 
            value={customNotes}
            onChange={(e) => onNotesChange?.(e.target.value)}
            placeholder="Enter notes..." 
            style={{ width: "100%", height: "4.5rem", padding: "0.625rem", borderRadius: "0.5rem", border: "1px solid #cbd1da", backgroundColor: "#ffffff", fontSize: "0.875rem", fontWeight: 800, color: "#000000", outline: "none" }}
          />
        )}
      </div>
    </div>
  );
}
