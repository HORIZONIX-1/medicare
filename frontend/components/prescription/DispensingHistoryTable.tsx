"use client";

import React from "react";
import { Search } from "lucide-react";

export interface HistoryItem {
  id: number;
  date: string;
  time: string;
  prescriptionId: string;
  patientName: string;
  patientId: string;
  age: string;
  gender: string;
  diagnosis: string;
  doctor: string;
  status: 'Fully Dispensed' | 'Partially Dispensed' | 'Declined';
  dispenser: string;
  drugs: { name: string; type: string; prescribedQty: number; dispensedQty: number }[];
  notes: string;
}

interface Props {
  history: HistoryItem[];
  selectedItem: HistoryItem | null;
  onSelectItem: (item: HistoryItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  dateFilter: string;
  onDateFilterChange: (date: string) => void;
}

export default function DispensingHistoryTable({
  history,
  selectedItem,
  onSelectItem,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
}: Props) {
  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #cbd1da", borderRadius: "0.75rem", padding: "1.75rem", height: "620px", display: "flex", flexDirection: "column", color: "#000000", fontFamily: "'Poppins', sans-serif" }}>
      <h3 style={{ fontSize: "0.9375rem", fontWeight: 900, color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
        DISPENSATION LOGS
      </h3>
      
      {/* Search & Filters */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.625rem", marginBottom: "1.25rem", flexShrink: 0 }}>
        <div style={{ position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#000000" }} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Patient / ID" 
            style={{ width: "100%", paddingLeft: "2.25rem", paddingRight: "0.75rem", height: "2.5rem", border: "1px solid #cbd1da", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 700, outline: "none", backgroundColor: "#ffffff", color: "#000000" }}
          />
        </div>
        
        <div>
          <select 
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            style={{ width: "100%", height: "2.5rem", padding: "0 0.75rem", border: "1px solid #cbd1da", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 800, outline: "none", backgroundColor: "#ffffff", color: "#000000" }}
          >
            <option value="All">All Statuses</option>
            <option value="Fully Dispensed">Fully Dispensed</option>
            <option value="Declined">Declined by Patient</option>
          </select>
        </div>

        <div>
          <select 
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            style={{ width: "100%", height: "2.5rem", padding: "0 0.75rem", border: "1px solid #cbd1da", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 800, outline: "none", backgroundColor: "#ffffff", color: "#000000" }}
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto", border: "1px solid #cbd1da", borderRadius: "0.5rem" }}>
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1.5px solid #cbd1da", fontSize: "0.78125rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", height: "2.875rem" }}>
              <th style={{ padding: "0 1rem", width: "3rem" }}>#</th>
              <th style={{ padding: "0 1rem" }}>PATIENT NAME</th>
              <th style={{ padding: "0 1rem" }}>PRESCRIPTION</th>
              <th style={{ padding: "0 1rem" }}>DATE</th>
              <th style={{ padding: "0 1rem", textAlign: "center" }}>STATUS</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.875rem", fontWeight: 800, color: "#000000" }}>
            {history.length > 0 ? (
              history.map((item, idx) => (
                <tr 
                  key={item.id} 
                  onClick={() => onSelectItem(item)}
                  style={{
                    height: "3.5rem",
                    cursor: "pointer",
                    borderBottom: "1px solid #cbd1da",
                    backgroundColor: selectedItem?.id === item.id ? "#e2e8f0" : "transparent"
                  }}
                >
                  <td style={{ padding: "0 1rem", fontWeight: 800, color: "#000000" }}>{idx + 1}</td>
                  <td style={{ padding: "0 1rem" }}>
                    <div style={{ fontWeight: 900, fontSize: "0.9375rem", color: "#000000" }}>{item.patientName}</div>
                    <div style={{ fontSize: "0.78125rem", color: "#000000", fontFamily: "monospace", fontWeight: 800 }}>{item.patientId}</div>
                  </td>
                  <td style={{ padding: "0 1rem", fontFamily: "monospace", color: "#1d4ed8", fontSize: "0.9375rem", fontWeight: 900 }}>{item.prescriptionId}</td>
                  <td style={{ padding: "0 1rem" }}>
                    <div style={{ color: "#000000", fontWeight: 800, fontSize: "0.875rem" }}>{item.date}</div>
                    <div style={{ fontSize: "0.75rem", color: "#000000", fontWeight: 700 }}>{item.time}</div>
                  </td>
                  <td style={{ padding: "0 1rem", textAlign: "center" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.25rem 0.625rem",
                      fontSize: "0.6875rem",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderRadius: "0.375rem",
                      border: item.status === 'Fully Dispensed' ? "1px solid #a7f3d0" : "1px solid #fde68a",
                      backgroundColor: item.status === 'Fully Dispensed' ? "#d1fae5" : "#fef3c7",
                      color: item.status === 'Fully Dispensed' ? "#065f46" : "#78350f"
                    }}>
                      {item.status.split(' ')[0]}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "2.5rem 0", fontSize: "0.875rem", fontWeight: 800, color: "#000000" }}>
                  No dispensation history records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", fontSize: "0.84375rem", fontWeight: 800, color: "#000000", flexShrink: 0 }}>
        <span>Showing {history.length} entries</span>
        <div style={{ display: "flex", gap: "0.375rem" }}>
          <button style={{ padding: "0.375rem 0.625rem", border: "1px solid #cbd1da", borderRadius: "0.375rem", color: "#000000", backgroundColor: "#ffffff" }} disabled>&lt;</button>
          <button style={{ padding: "0.375rem 0.75rem", backgroundColor: "#000000", color: "#ffffff", borderRadius: "0.375rem", fontWeight: 900 }}>1</button>
          <button style={{ padding: "0.375rem 0.625rem", border: "1px solid #cbd1da", borderRadius: "0.375rem", color: "#000000", backgroundColor: "#ffffff" }} disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
}
