"use client";

import React from "react";
import { Search, Filter } from "lucide-react";

export interface QueueItem {
  id: number;
  name: string;
  pid: string;
  date: string;
  age: string;
  gender: string;
  diagnosis: string;
  doctor: string;
  drugs: { name: string; strength: string; type: string; qty: number }[];
  alerts: string[];
  notes?: string;
}

interface Props {
  queues: QueueItem[];
  selectedItem: QueueItem | null;
  onSelectItem: (item: QueueItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function DispensingQueueTable({
  queues,
  selectedItem,
  onSelectItem,
  searchQuery,
  onSearchChange,
}: Props) {
  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #cbd1da", borderRadius: "0.5rem", padding: "1.5rem", height: "550px", display: "flex", flexDirection: "column", color: "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
      <h3 style={{ fontSize: "0.75rem", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
        PRESCRIPTION QUEUE
      </h3>
      
      {/* Search & Filter */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexShrink: 0 }}>
        <div style={{ position: "relative", flex: 1, display: "flex", border: "1px solid #cbd1da", borderRadius: "0.375rem", backgroundColor: "#ffffff", padding: "0 0.75rem", alignItems: "center" }}>
          <Search size={14} style={{ color: "#334155", marginRight: "0.5rem" }} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Patient Name / ID" 
            style={{ border: "none", width: "100%", height: "2.25rem", fontSize: "0.75rem", fontWeight: 700, outline: "none", color: "#0f172a" }}
          />
        </div>
        <button style={{ height: "2.25rem", padding: "0 1rem", fontSize: "0.75rem", fontWeight: 900, color: "#ffffff", backgroundColor: "#0f172a", border: "1px solid #0f172a", borderRadius: "0.375rem", cursor: "pointer" }}>
          SEARCH
        </button>
        <button style={{ height: "2.25rem", width: "2.25rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #cbd1da", backgroundColor: "#ffffff", color: "#0f172a", borderRadius: "0.375rem", cursor: "pointer" }}>
          <Filter size={14} />
        </button>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto", border: "1px solid #cbd1da", borderRadius: "0.375rem" }}>
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #cbd1da", fontSize: "0.625rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0f172a", height: "2.5rem" }}>
              <th style={{ padding: "0 0.75rem", width: "2.5rem" }}>#</th>
              <th style={{ padding: "0 0.75rem" }}>PATIENT NAME</th>
              <th style={{ padding: "0 0.75rem" }}>PATIENT ID</th>
              <th style={{ padding: "0 0.75rem" }}>DATE</th>
              <th style={{ padding: "0 0.75rem", textAlign: "center" }}>STATUS</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a" }}>
            {queues.length > 0 ? (
              queues.map((row, idx) => (
                <tr 
                  key={row.id} 
                  onClick={() => onSelectItem(row)}
                  style={{
                    height: "2.75rem",
                    cursor: "pointer",
                    borderBottom: "1px solid #cbd1da",
                    backgroundColor: selectedItem?.id === row.id ? "#e2e8f0" : "transparent"
                  }}
                >
                  <td style={{ padding: "0 0.75rem", fontWeight: 800, color: "#1e293b" }}>{idx + 1}</td>
                  <td style={{ padding: "0 0.75rem", fontWeight: 900, color: "#0f172a" }}>{row.name}</td>
                  <td style={{ padding: "0 0.75rem", fontFamily: "monospace", color: "#1d4ed8", fontWeight: 800 }}>{row.pid}</td>
                  <td style={{ padding: "0 0.75rem", color: "#1e293b", fontWeight: 700 }}>{row.date}</td>
                  <td style={{ padding: "0 0.75rem", textAlign: "center" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", padding: "0.125rem 0.625rem", fontSize: "0.5625rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", borderRadius: "0.25rem", border: "1px solid #fde68a", backgroundColor: "#fef3c7", color: "#78350f" }}>
                      Pending
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "2rem 0", fontSize: "0.75rem", fontWeight: 800, color: "#334155" }}>
                  No pending prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "#334155", flexShrink: 0 }}>
        <span>Showing {queues.length} entries</span>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          <button style={{ padding: "0.25rem 0.5rem", border: "1px solid #cbd1da", borderRadius: "0.25rem", color: "#64748b", backgroundColor: "#ffffff" }} disabled>&lt;</button>
          <button style={{ padding: "0.25rem 0.625rem", backgroundColor: "#0f172a", color: "#ffffff", borderRadius: "0.25rem", fontWeight: 900 }}>1</button>
          <button style={{ padding: "0.25rem 0.5rem", border: "1px solid #cbd1da", borderRadius: "0.25rem", color: "#64748b", backgroundColor: "#ffffff" }} disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
}
