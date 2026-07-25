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
  status: 'Fully Dispensed' | 'Partially Dispensed';
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
    <div className="bg-white border border-[#cbd1da] rounded p-6 h-[550px] flex flex-col text-[#0f172a]">
      <h3 className="text-xs font-black text-[#0f172a] uppercase tracking-wider mb-3">DISPENSATION LOGS</h3>
      
      {/* Search & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 shrink-0">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#334155]" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Patient / ID" 
            className="w-full pl-8 pr-3 h-9 border border-[#cbd1da] rounded text-xs font-bold focus:outline-none focus:border-[#0f172a] bg-white text-[#0f172a] placeholder-[#475569]"
          />
        </div>
        
        <div>
          <select 
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full h-9 px-3 border border-[#cbd1da] rounded text-xs font-bold focus:outline-none focus:border-[#0f172a] bg-white text-[#0f172a]"
          >
            <option value="All">All Statuses</option>
            <option value="Fully Dispensed">Fully Dispensed</option>
            <option value="Partially Dispensed">Partially Dispensed</option>
          </select>
        </div>

        <div>
          <select 
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="w-full h-9 px-3 border border-[#cbd1da] rounded text-xs font-bold focus:outline-none focus:border-[#0f172a] bg-white text-[#0f172a]"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto border border-[#cbd1da] rounded">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f1f5f9] border-b border-[#cbd1da] text-[10px] font-black uppercase tracking-wider text-[#0f172a] h-10">
              <th className="px-3 w-8">#</th>
              <th className="px-3">PATIENT NAME</th>
              <th className="px-3">PRESCRIPTION</th>
              <th className="px-3">DATE</th>
              <th className="px-3 text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cbd1da] text-xs font-bold text-[#0f172a]">
            {history.length > 0 ? (
              history.map((item, idx) => (
                <tr 
                  key={item.id} 
                  onClick={() => onSelectItem(item)}
                  className={`h-12 cursor-pointer transition-colors ${
                    selectedItem?.id === item.id ? 'bg-[#e2e8f0] font-black' : 'hover:bg-[#f1f5f9]'
                  }`}
                >
                  <td className="px-3 font-extrabold text-[#1e293b]">{idx + 1}</td>
                  <td className="px-3">
                    <div className="font-black text-[#0f172a]">{item.patientName}</div>
                    <div className="text-[10px] text-[#334155] font-mono font-bold">{item.patientId}</div>
                  </td>
                  <td className="px-3 font-mono text-[#1d4ed8] font-extrabold">{item.prescriptionId}</td>
                  <td className="px-3">
                    <div className="text-[#0f172a] font-bold">{item.date}</div>
                    <div className="text-[10px] text-[#334155] font-bold">{item.time}</div>
                  </td>
                  <td className="px-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border ${
                      item.status === 'Fully Dispensed' 
                        ? 'text-emerald-900 border-emerald-300 bg-emerald-100' 
                        : 'text-amber-900 border-amber-300 bg-amber-100'
                    }`}>
                      {item.status.split(' ')[0]}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8 text-xs font-extrabold text-[#334155]">
                  No dispensation history records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-3 text-xs font-bold text-[#334155] shrink-0">
        <span>Showing {history.length} entries</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 border border-[#cbd1da] rounded text-[#64748b]" disabled>&lt;</button>
          <button className="px-2.5 py-1 bg-[#0f172a] text-white rounded font-extrabold">1</button>
          <button className="px-2 py-1 border border-[#cbd1da] rounded text-[#64748b]" disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
}
