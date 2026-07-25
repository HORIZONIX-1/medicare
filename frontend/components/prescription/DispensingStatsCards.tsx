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
    <div className="grid grid-cols-3 gap-4 text-[#0f172a]">
      <div className="bg-white border border-[#cbd1da] rounded p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded bg-[#f1f5f9] flex items-center justify-center flex-shrink-0">
          <FileText size={18} className="text-[#0f172a]" />
        </div>
        <div>
          <p className="text-xl font-black text-[#0f172a] leading-tight">{total}</p>
          <p className="text-[10px] font-black uppercase tracking-wider text-[#334155] mt-0.5">
            {isQueue ? "Total" : "Total Dispensed"}
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#cbd1da] rounded p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
          <Clock size={18} className="text-amber-700" />
        </div>
        <div>
          <p className="text-xl font-black text-[#0f172a] leading-tight">{pendingOrFull}</p>
          <p className="text-[10px] font-black uppercase tracking-wider text-[#334155] mt-0.5">
            {isQueue ? "Pending" : "Fully Dispensed"}
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#cbd1da] rounded p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded bg-[#e0f2fe] flex items-center justify-center flex-shrink-0">
          <Check size={18} className="text-[#1d4ed8]" />
        </div>
        <div>
          <p className="text-xl font-black text-[#0f172a] leading-tight">{dispensedOrPartial}</p>
          <p className="text-[10px] font-black uppercase tracking-wider text-[#334155] mt-0.5">
            {isQueue ? "Dispensed" : "Partially Dispensed"}
          </p>
        </div>
      </div>
    </div>
  );
}
