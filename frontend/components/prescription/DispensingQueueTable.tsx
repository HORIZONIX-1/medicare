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
    <div className="bg-white border border-[#cbd1da] rounded p-6 h-[550px] flex flex-col text-[#0f172a]">
      <h3 className="text-xs font-black text-[#0f172a] uppercase tracking-wider mb-3">PRESCRIPTION QUEUE</h3>
      
      {/* Search & Filter */}
      <div className="flex gap-2 mb-4 shrink-0">
        <div className="relative flex-1 flex border border-[#cbd1da] rounded bg-white px-3 items-center">
          <Search size={14} className="text-[#334155] mr-2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Patient Name / ID" 
            className="border-none w-full h-9 text-xs font-bold outline-none text-[#0f172a] placeholder-[#475569]"
          />
        </div>
        <button className="h-9 px-4 text-xs font-black text-white bg-[#0f172a] border border-[#0f172a] rounded hover:bg-[#1e293b] transition-colors">
          SEARCH
        </button>
        <button className="h-9 w-9 flex items-center justify-center border border-[#cbd1da] bg-white text-[#0f172a] rounded hover:bg-[#f1f5f9] transition-colors">
          <Filter size={14} />
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto border border-[#cbd1da] rounded">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f1f5f9] border-b border-[#cbd1da] text-[10px] font-black uppercase tracking-wider text-[#0f172a] h-10">
              <th className="px-3 w-10">#</th>
              <th className="px-3">PATIENT NAME</th>
              <th className="px-3">PATIENT ID</th>
              <th className="px-3">DATE</th>
              <th className="px-3 text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cbd1da] text-xs font-bold text-[#0f172a]">
            {queues.length > 0 ? (
              queues.map((row, idx) => (
                <tr 
                  key={row.id} 
                  onClick={() => onSelectItem(row)}
                  className={`h-11 cursor-pointer transition-colors ${
                    selectedItem?.id === row.id ? 'bg-[#e2e8f0] font-black' : 'hover:bg-[#f1f5f9]'
                  }`}
                >
                  <td className="px-3 font-extrabold text-[#1e293b]">{idx + 1}</td>
                  <td className="px-3 font-black text-[#0f172a]">{row.name}</td>
                  <td className="px-3 font-mono text-[#1d4ed8] font-extrabold">{row.pid}</td>
                  <td className="px-3 text-[#1e293b] font-bold">{row.date}</td>
                  <td className="px-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border border-amber-300 bg-amber-100 text-amber-900">
                      Pending
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8 text-xs font-extrabold text-[#334155]">
                  No pending prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-3 text-xs font-bold text-[#334155] shrink-0">
        <span>Showing {queues.length} entries</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 border border-[#cbd1da] rounded text-[#64748b]" disabled>&lt;</button>
          <button className="px-2.5 py-1 bg-[#0f172a] text-white rounded font-extrabold">1</button>
          <button className="px-2 py-1 border border-[#cbd1da] rounded text-[#64748b]" disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
}
