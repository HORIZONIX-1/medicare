"use client";

import React from "react";
import { FileText, Clock, Check } from "lucide-react";

interface StatsProps {
  total: number;
  pendingOrFull: number;
  dispensedOrPartial: number;
  type?: "queue" | "history";
}

export default function DispensingStatsCards({
  total,
  pendingOrFull,
  dispensedOrPartial,
  type = "queue",
}: StatsProps) {
  const isQueue = type === "queue";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem", color: "#000000", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ backgroundColor: "#ffffff", border: "1px solid #cbd1da", borderRadius: "0.75rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.5rem", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#000000" }}>
          <FileText size={20} />
        </div>
        <div>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#000000", lineHeight: 1, margin: 0 }}>{total}</p>
          <p style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", marginTop: "0.375rem", margin: 0 }}>
            {isQueue ? "Total" : "Total Dispensed"}
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: "#ffffff", border: "1px solid #cbd1da", borderRadius: "0.75rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.5rem", backgroundColor: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#b45309" }}>
          <Clock size={20} />
        </div>
        <div>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#000000", lineHeight: 1, margin: 0 }}>{pendingOrFull}</p>
          <p style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", marginTop: "0.375rem", margin: 0 }}>
            {isQueue ? "Awaiting Billing" : "Fully Dispensed"}
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: "#ffffff", border: "1px solid #cbd1da", borderRadius: "0.75rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.5rem", backgroundColor: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#1d4ed8" }}>
          <Check size={20} />
        </div>
        <div>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#000000", lineHeight: 1, margin: 0 }}>{dispensedOrPartial}</p>
          <p style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", marginTop: "0.375rem", margin: 0 }}>
            {isQueue ? "Ready to Dispense" : "Declined"}
          </p>
        </div>
      </div>
    </div>
  );
}
