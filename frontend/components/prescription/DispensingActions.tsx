"use client";

import React from "react";
import { Printer, Download } from "lucide-react";

interface Props {
  type: "queue" | "history";
  onDispenseFull?: () => void;
  onDispensePartial?: () => void;
  onCancel?: () => void;
  onPrint?: () => void;
  onDownload?: () => void;
}

export default function DispensingActions({
  type,
  onDispenseFull,
  onDispensePartial,
  onCancel,
  onPrint,
  onDownload,
}: Props) {
  const btnBaseStyle = {
    flex: 1,
    padding: "0.75rem 1rem",
    fontSize: "0.84375rem",
    fontWeight: 800,
    borderRadius: "0.75rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontFamily: "'Poppins', sans-serif"
  };

  if (type === "history") {
    return (
      <div style={{ display: "flex", gap: "0.875rem", marginTop: "1.25rem", borderTop: "1px solid #cbd1da", paddingTop: "1.25rem", flexShrink: 0 }}>
        <button 
          onClick={onPrint}
          style={{ ...btnBaseStyle, color: "#ffffff", backgroundColor: "#000000", border: "1px solid #000000" }}
        >
          <Printer size={16} style={{ color: "#ffffff" }} /> <span style={{ color: "#ffffff" }}>PRINT RECEIPT</span>
        </button>
        <button 
          onClick={onDownload}
          style={{ ...btnBaseStyle, color: "#000000", backgroundColor: "#ffffff", border: "1px solid #cbd1da" }}
        >
          <Download size={16} style={{ color: "#000000" }} /> <span>EXPORT RECORD</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "0.875rem", marginTop: "1.25rem", borderTop: "1px solid #cbd1da", paddingTop: "1.25rem", flexShrink: 0 }}>
      <button 
        onClick={onDispenseFull}
        style={{ ...btnBaseStyle, color: "#ffffff", backgroundColor: "#000000", border: "1px solid #000000" }}
      >
        <span style={{ color: "#ffffff" }}>DISPENSE AVAILABLE</span>
      </button>
      <button 
        onClick={onDispensePartial}
        style={{ ...btnBaseStyle, color: "#000000", backgroundColor: "#ffffff", border: "1px solid #cbd1da" }}
      >
        <span>MARK AS PARTIAL</span>
      </button>
      <button 
        onClick={onCancel}
        style={{ padding: "0.75rem 1.25rem", fontSize: "0.84375rem", fontWeight: 800, color: "#dc2626", backgroundColor: "#ffffff", border: "1px solid #fca5a5", borderRadius: "0.75rem", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
      >
        CANCEL
      </button>
    </div>
  );
}
