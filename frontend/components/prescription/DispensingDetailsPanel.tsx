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
      <div className="bg-white border border-[#cbd1da] rounded p-6 flex flex-col items-center justify-center min-h-[580px] text-[#334155]">
        <FileText size={40} className="text-[#64748b] mb-2" />
        <p className="text-xs font-bold">Select a prescription record from the list to view details.</p>
      </div>
    );
  }

  const patientName = selectedItem.patientName || selectedItem.name || "Patient";
  const patientCode = selectedItem.patientId || selectedItem.pid || "-";

  return (
    <div className="bg-white border border-[#cbd1da] rounded p-6 flex flex-col min-h-[580px] text-[#0f172a]">
      <h3 className="text-xs font-black text-[#0f172a] uppercase tracking-wider mb-4 border-b border-[#cbd1da] pb-2">
        {isHistory ? "DISPENSED DETAILS" : "PRESCRIPTION DETAILS"}
      </h3>
      
      {/* Patient Info Banner */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded bg-[#f1f5f9] border border-[#cbd1da] flex items-center justify-center text-[#0f172a] shrink-0">
            <User size={22} />
          </div>
          <div>
            <h2 className="text-base font-black text-[#0f172a] leading-snug">{patientName}</h2>
            <div className="text-xs font-bold text-[#334155] flex gap-2 mt-0.5">
              <span className="font-mono text-[#1d4ed8] font-extrabold">{patientCode}</span>
              <span>•</span>
              <span>{selectedItem.age}</span>
              <span>•</span>
              <span>{selectedItem.gender}</span>
            </div>
          </div>
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0f172a] block mb-1">
            {isHistory ? "Dispensed Date" : "Prescription Date"}
          </span>
          <div className="flex items-center gap-2 border border-[#cbd1da] rounded px-3 py-1 text-xs font-extrabold text-[#0f172a] bg-[#f8fafc]">
            <span>{selectedItem.date}</span>
            <Calendar size={13} className="text-[#334155]" />
          </div>
        </div>
      </div>

      {/* Diagnosis & Doctor / Dispenser */}
      <div className={`grid ${isHistory ? 'grid-cols-3' : 'grid-cols-2'} gap-3 mb-5`}>
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0f172a] block mb-1">Diagnosis</span>
          <div className="border border-[#cbd1da] rounded p-2 text-xs font-bold text-[#0f172a] bg-[#f8fafc]">
            {selectedItem.diagnosis}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0f172a] block mb-1">
            {isHistory ? "Doctor" : "Prescribing Doctor"}
          </span>
          <div className="border border-[#cbd1da] rounded p-2 text-xs font-bold text-[#0f172a] bg-[#f8fafc]">
            {selectedItem.doctor}
          </div>
        </div>
        {isHistory && selectedItem.dispenser && (
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0f172a] block mb-1">Dispenser</span>
            <div className="border border-[#cbd1da] rounded p-2 text-xs font-bold text-[#0f172a] bg-[#f8fafc]">
              {selectedItem.dispenser}
            </div>
          </div>
        )}
      </div>

      {/* Prescribed Medicines */}
      <div className="flex-1 mb-5 overflow-y-auto">
        <h4 className="text-[10px] font-black text-[#0f172a] uppercase tracking-wider mb-2 border-b border-[#cbd1da] pb-1">
          {isHistory ? "DISPENSED MEDICINES LOG" : "PRESCRIBED MEDICINES"}
        </h4>
        <div className="border border-[#cbd1da] rounded overflow-hidden">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#f1f5f9] border-b border-[#cbd1da] text-[10px] font-black uppercase tracking-wider text-[#0f172a] h-9">
                <th className="px-3 w-8">#</th>
                <th className="px-3">DRUG NAME</th>
                {isHistory ? (
                  <>
                    <th className="px-3 text-center">PRESCRIBED</th>
                    <th className="px-3 text-center">DISPENSED</th>
                    <th className="px-3 text-right">STATUS</th>
                  </>
                ) : (
                  <>
                    <th className="px-3">STRENGTH / FORM</th>
                    <th className="px-3 w-20 text-center">QTY</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cbd1da] font-bold text-[#0f172a]">
              {selectedItem.drugs.map((drug: any, index: number) => {
                if (isHistory) {
                  const isPartial = drug.dispensedQty < drug.prescribedQty;
                  return (
                    <tr key={index} className="h-11 hover:bg-[#f8fafc]">
                      <td className="px-3 font-extrabold text-[#1e293b]">{index + 1}</td>
                      <td className="px-3">
                        <p className="font-black text-[#0f172a]">{drug.name}</p>
                        <p className="text-[10px] text-[#334155] font-bold">{drug.type}</p>
                      </td>
                      <td className="px-3 text-center text-[#1e293b] font-extrabold">{drug.prescribedQty}</td>
                      <td className={`px-3 text-center font-black ${isPartial ? 'text-amber-800' : 'text-[#0f172a]'}`}>
                        {drug.dispensedQty}
                      </td>
                      <td className="px-3 text-right">
                        {drug.dispensedQty === 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border border-red-300 bg-red-100 text-red-900">
                            Out of Stock
                          </span>
                        ) : isPartial ? (
                          <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border border-amber-300 bg-amber-100 text-amber-900">
                            Partial
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border border-emerald-300 bg-emerald-100 text-emerald-900">
                            Dispensed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={index} className="h-10 hover:bg-[#f8fafc]">
                    <td className="px-3 font-extrabold text-[#1e293b]">{index + 1}</td>
                    <td className="px-3 font-black text-[#0f172a]">{drug.name}</td>
                    <td className="px-3 text-[#1e293b] font-bold">{drug.strength} / {drug.type}</td>
                    <td className="px-3 text-center font-black text-[#1d4ed8]">{drug.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety Alerts */}
      {!isHistory && selectedItem.alerts && selectedItem.alerts.length > 0 && (
        <div className="flex gap-3 p-3 border border-red-300 rounded bg-red-50 mb-4 shrink-0">
          <AlertTriangle size={18} className="text-red-700 mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] font-black text-red-900 uppercase tracking-wider block mb-1">SAFETY ALERTS</span>
            <ul className="text-xs font-extrabold text-red-900 list-disc pl-4 space-y-0.5">
              {selectedItem.alerts.map((alert: string, idx: number) => (
                <li key={idx}>{alert}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="mb-2 shrink-0">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#0f172a] block mb-1">
          {isHistory ? "DISPENSATION NOTES" : "NOTES (OPTIONAL)"}
        </span>
        {isHistory ? (
          <div className="bg-[#f8fafc] border border-[#cbd1da] rounded p-3 text-xs font-bold text-[#0f172a] italic">
            {selectedItem.notes || "No custom notes entered during dispensation."}
          </div>
        ) : (
          <textarea 
            value={customNotes}
            onChange={(e) => onNotesChange?.(e.target.value)}
            placeholder="Enter notes..." 
            className="w-full h-16 p-2 rounded border border-[#cbd1da] bg-white text-xs font-bold text-[#0f172a] focus:border-[#0f172a] focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}
