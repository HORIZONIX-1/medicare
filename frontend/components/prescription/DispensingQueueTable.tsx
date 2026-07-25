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
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #cbd1da", borderRadius: "0.75rem", padding: "1.75rem", height: "620px", display: "flex", flexDirection: "column", color: "#000000", fontFamily: "'Poppins', sans-serif" }}>
      <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
        PRESCRIPTION QUEUE
      </h3>
      
      {/* Search & Filter */}
      <div style={{ display: "flex", gap: "0.625rem", marginBottom: "1.25rem", flexShrink: 0 }}>
        <div style={{ position: "relative", flex: 1, display: "flex", border: "1px solid #cbd1da", borderRadius: "0.5rem", backgroundColor: "#ffffff", padding: "0 0.875rem", alignItems: "center" }}>
          <Search size={16} style={{ color: "#000000", marginRight: "0.625rem" }} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Patient Name / ID" 
            style={{ border: "none", width: "100%", height: "2.5rem", fontSize: "0.875rem", fontWeight: 600, outline: "none", color: "#000000" }}
          />
        </div>
        <button style={{ height: "2.5rem", padding: "0 1.25rem", fontSize: "0.84375rem", fontWeight: 800, color: "#ffffff", backgroundColor: "#000000", border: "1px solid #000000", borderRadius: "0.5rem", cursor: "pointer" }}>
          SEARCH
        </button>
        <button style={{ height: "2.5rem", width: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #cbd1da", backgroundColor: "#ffffff", color: "#000000", borderRadius: "0.5rem", cursor: "pointer" }}>
          <Filter size={16} />
        </button>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto", border: "1px solid #cbd1da", borderRadius: "0.5rem" }}>
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1.5px solid #cbd1da", fontSize: "0.78125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", height: "2.875rem" }}>
              <th style={{ padding: "0 1rem", width: "3rem" }}>#</th>
              <th style={{ padding: "0 1rem" }}>PATIENT NAME</th>
              <th style={{ padding: "0 1rem" }}>PATIENT ID</th>
              <th style={{ padding: "0 1rem" }}>DATE</th>
              <th style={{ padding: "0 1rem", textAlign: "center" }}>STATUS</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.875rem", fontWeight: 600, color: "#000000" }}>
            {queues.length > 0 ? (
              queues.map((row, idx) => (
                <tr 
                  key={row.id} 
                  onClick={() => onSelectItem(row)}
                  style={{
                    height: "3.25rem",
                    cursor: "pointer",
                    borderBottom: "1px solid #cbd1da",
                    backgroundColor: selectedItem?.id === row.id ? "#e2e8f0" : "transparent"
                  }}
                >
                  <td style={{ padding: "0 1rem", fontWeight: 600, color: "#000000" }}>{idx + 1}</td>
                  <td style={{ padding: "0 1rem", fontWeight: 700, fontSize: "0.9375rem", color: "#000000" }}>{row.name}</td>
                  <td style={{ padding: "0 1rem", fontFamily: "monospace", color: "#1d4ed8", fontSize: "0.9375rem", fontWeight: 700 }}>{row.pid}</td>
                  <td style={{ padding: "0 1rem", color: "#000000", fontWeight: 600, fontSize: "0.875rem" }}>{row.date}</td>
                  <td style={{ padding: "0 1rem", textAlign: "center" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", padding: "0.25rem 0.625rem", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", borderRadius: "0.375rem", border: "1px solid #fde68a", backgroundColor: "#fef3c7", color: "#78350f" }}>
                      Pending
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "2.5rem 0", fontSize: "0.875rem", fontWeight: 800, color: "#000000" }}>
                  No pending prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", fontSize: "0.84375rem", fontWeight: 800, color: "#000000", flexShrink: 0 }}>
        <span>Showing {queues.length} entries</span>
        <div style={{ display: "flex", gap: "0.375rem" }}>
          <button style={{ padding: "0.375rem 0.625rem", border: "1px solid #cbd1da", borderRadius: "0.375rem", color: "#000000", backgroundColor: "#ffffff" }} disabled>&lt;</button>
          <button style={{ padding: "0.375rem 0.75rem", backgroundColor: "#000000", color: "#ffffff", borderRadius: "0.375rem", fontWeight: 900 }}>1</button>
          <button style={{ padding: "0.375rem 0.625rem", border: "1px solid #cbd1da", borderRadius: "0.375rem", color: "#000000", backgroundColor: "#ffffff" }} disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
}
