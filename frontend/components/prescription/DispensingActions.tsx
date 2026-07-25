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
  if (type === "history") {
    return (
      <div className="flex gap-3 mt-4 shrink-0 border-t border-[#e2e8f0] pt-4">
        <button 
          onClick={onPrint}
          className="flex-1 py-2.5 text-xs font-extrabold text-white bg-[#111827] border border-[#111827] rounded hover:bg-[#1f2937] transition-colors flex items-center justify-center gap-2"
        >
          <Printer size={14} /> <span>PRINT RECEIPT</span>
        </button>
        <button 
          onClick={onDownload}
          className="flex-1 py-2.5 text-xs font-extrabold text-[#111827] bg-white border border-[#cbd1da] rounded hover:bg-[#f3f4f6] transition-colors flex items-center justify-center gap-2"
        >
          <Download size={14} /> <span>EXPORT RECORD</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mt-4 border-t border-[#e2e8f0] pt-4 shrink-0">
      <button 
        onClick={onDispenseFull}
        className="flex-1 py-2.5 text-xs font-extrabold text-white bg-[#111827] border border-[#111827] rounded hover:bg-[#1f2937] transition-colors"
      >
        DISPENSE AVAILABLE
      </button>
      <button 
        onClick={onDispensePartial}
        className="flex-1 py-2.5 text-xs font-extrabold text-[#111827] bg-white border border-[#cbd1da] rounded hover:bg-[#f3f4f6] transition-colors"
      >
        MARK AS PARTIAL
      </button>
      <button 
        onClick={onCancel}
        className="px-4 py-2.5 text-xs font-extrabold text-red-600 bg-white border border-red-200 rounded hover:bg-red-50 transition-colors"
      >
        CANCEL
      </button>
    </div>
  );
}
