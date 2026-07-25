"use client";

import React, { useState, useMemo } from 'react';
import { Search, Calendar, FileText, Clock, Check, Printer, Download, X, User } from 'lucide-react';

interface Drug {
  name: string;
  type: string;
  prescribedQty: number;
  dispensedQty: number;
}

interface HistoryItem {
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
  drugs: Drug[];
  notes: string;
}

const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 1,
    date: '2026-06-07',
    time: '04:15 PM',
    prescriptionId: 'RX000123',
    patientName: 'Kamal Perera',
    patientId: 'P000123',
    age: '32 Years',
    gender: 'Male',
    diagnosis: 'Viral Fever',
    doctor: 'Dr. Kamal Perera',
    status: 'Fully Dispensed',
    dispenser: 'Dispenser',
    drugs: [
      { name: 'Paracetamol 500mg', type: 'Tablet', prescribedQty: 10, dispensedQty: 10 },
      { name: 'Cetrizine 10mg', type: 'Tablet', prescribedQty: 20, dispensedQty: 20 },
      { name: 'Cough Syrup 100ml', type: 'Syrup', prescribedQty: 1, dispensedQty: 1 },
    ],
    notes: 'Patient advised to take Paracetamol after meals.'
  },
  {
    id: 2,
    date: '2026-06-07',
    time: '02:30 PM',
    prescriptionId: 'RX000124',
    patientName: 'Nisha Gunawardena',
    patientId: 'P000185',
    age: '45 Years',
    gender: 'Female',
    diagnosis: 'Hypertension',
    doctor: 'Dr. S. Alwis',
    status: 'Partially Dispensed',
    dispenser: 'Dispenser',
    drugs: [
      { name: 'Amlodipine 5mg', type: 'Tablet', prescribedQty: 30, dispensedQty: 30 },
      { name: 'Metformin 500mg', type: 'Tablet', prescribedQty: 60, dispensedQty: 30 },
    ],
    notes: 'Metformin partially dispensed. Remaining 30 tablets to be collected next week when new stock arrives.'
  },
  {
    id: 3,
    date: '2026-06-06',
    time: '11:15 AM',
    prescriptionId: 'RX000122',
    patientName: 'Saman Kumara',
    patientId: 'P000210',
    age: '58 Years',
    gender: 'Male',
    diagnosis: 'Type 2 Diabetes',
    doctor: 'Dr. R. Perera',
    status: 'Fully Dispensed',
    dispenser: 'Dispenser',
    drugs: [
      { name: 'Metformin 500mg', type: 'Tablet', prescribedQty: 90, dispensedQty: 90 },
      { name: 'Atorvastatin 10mg', type: 'Tablet', prescribedQty: 30, dispensedQty: 30 },
    ],
    notes: ''
  },
  {
    id: 4,
    date: '2026-06-06',
    time: '09:45 AM',
    prescriptionId: 'RX000121',
    patientName: 'Fathima Rizan',
    patientId: 'P000305',
    age: '24 Years',
    gender: 'Female',
    diagnosis: 'Allergic Rhinitis',
    doctor: 'Dr. Kamal Perera',
    status: 'Fully Dispensed',
    dispenser: 'Dispenser',
    drugs: [
      { name: 'Cetrizine 10mg', type: 'Tablet', prescribedQty: 10, dispensedQty: 10 },
      { name: 'Fluticasone Nasal Spray', type: 'Spray', prescribedQty: 1, dispensedQty: 1 },
    ],
    notes: ''
  },
  {
    id: 5,
    date: '2026-06-05',
    time: '08:20 AM',
    prescriptionId: 'RX000120',
    patientName: 'John Doe',
    patientId: 'P000400',
    age: '38 Years',
    gender: 'Male',
    diagnosis: 'Acute Gastritis',
    doctor: 'Dr. S. Alwis',
    status: 'Partially Dispensed',
    dispenser: 'Dispenser',
    drugs: [
      { name: 'Omeprazole 20mg', type: 'Capsule', prescribedQty: 14, dispensedQty: 14 },
      { name: 'Gaviscon Liquid 150ml', type: 'Liquid', prescribedQty: 2, dispensedQty: 0 },
    ],
    notes: 'Gaviscon liquid out of stock. Partially dispensed omeprazole only.'
  },
  {
    id: 6,
    date: '2026-06-05',
    time: '03:10 PM',
    prescriptionId: 'RX000119',
    patientName: 'Priyantha Silva',
    patientId: 'P000142',
    age: '50 Years',
    gender: 'Male',
    diagnosis: 'Mild Bronchitis',
    doctor: 'Dr. R. Perera',
    status: 'Fully Dispensed',
    dispenser: 'Dispenser',
    drugs: [
      { name: 'Amoxicillin 250mg', type: 'Capsule', prescribedQty: 21, dispensedQty: 21 },
      { name: 'Salbutamol Inhaler', type: 'Inhaler', prescribedQty: 1, dispensedQty: 1 },
    ],
    notes: ''
  }
];

export default function DispensingHistory() {
  const [history] = useState<HistoryItem[]>(INITIAL_HISTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(INITIAL_HISTORY[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handlePrint = (item: HistoryItem) => {
    showToast(`Connecting to pharmacy printer... Printing receipt for ${item.patientName} (${item.prescriptionId})`);
  };

  const handleDownload = (item: HistoryItem) => {
    showToast(`Exporting PDF record for ${item.patientName} (${item.prescriptionId})`);
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch = 
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prescriptionId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'All' || 
        item.status === statusFilter;

      const matchesDate = (() => {
        if (dateFilter === 'All') return true;
        if (dateFilter === 'Today') return item.date === '2026-06-07';
        if (dateFilter === 'Yesterday') return item.date === '2026-06-06';
        return true;
      })();

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [history, searchQuery, statusFilter, dateFilter]);

  React.useEffect(() => {
    if (filteredHistory.length > 0) {
      if (!selectedItem || !filteredHistory.some(item => item.id === selectedItem.id)) {
        setSelectedItem(filteredHistory[0]);
      }
    } else {
      setSelectedItem(null);
    }
  }, [filteredHistory, selectedItem]);

  const stats = useMemo(() => {
    const total = history.length;
    const fully = history.filter(item => item.status === 'Fully Dispensed').length;
    const partially = history.filter(item => item.status === 'Partially Dispensed').length;
    return { total, fully, partially };
  }, [history]);

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-6 font-sans text-[#111827]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#111827] text-white text-xs font-bold px-4 py-3 rounded border border-gray-700 shadow-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white ml-2">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">Prescriptions / History</p>
        <h1 className="text-2xl font-extrabold text-[#111827] mt-0.5">Dispensing History</h1>
        <p className="text-xs font-medium text-[#64748b] mt-0.5">Review past prescription dispensations and status logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: History Logs */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-[#d5d9e0] rounded p-6 h-[550px] flex flex-col">
            <h3 className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider mb-3">DISPENSATION LOGS</h3>
            
            {/* Search & Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 shrink-0">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Patient / ID" 
                  className="w-full pl-8 pr-3 h-9 border border-[#cbd1da] rounded text-xs font-semibold focus:outline-none focus:border-[#111827] bg-white text-[#111827]"
                />
              </div>
              
              <div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-9 px-3 border border-[#cbd1da] rounded text-xs font-semibold focus:outline-none focus:border-[#111827] bg-white text-[#111827]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Fully Dispensed">Fully Dispensed</option>
                  <option value="Partially Dispensed">Partially Dispensed</option>
                </select>
              </div>

              <div>
                <select 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full h-9 px-3 border border-[#cbd1da] rounded text-xs font-semibold focus:outline-none focus:border-[#111827] bg-white text-[#111827]"
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
                  <tr className="bg-[#f1f2f4] border-b border-[#cbd1da] text-[10px] font-extrabold uppercase tracking-wider text-[#475569] h-10">
                    <th className="px-3 w-8">#</th>
                    <th className="px-3">PATIENT NAME</th>
                    <th className="px-3">PRESCRIPTION</th>
                    <th className="px-3">DATE</th>
                    <th className="px-3 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] text-xs font-semibold text-[#111827]">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item, idx) => (
                      <tr 
                        key={item.id} 
                        onClick={() => setSelectedItem(item)}
                        className={`h-12 cursor-pointer transition-colors ${
                          selectedItem?.id === item.id ? 'bg-[#f1f5f9] font-bold' : 'hover:bg-[#f8fafc]'
                        }`}
                      >
                        <td className="px-3 font-bold text-[#475569]">{idx + 1}</td>
                        <td className="px-3">
                          <div className="font-extrabold text-[#111827]">{item.patientName}</div>
                          <div className="text-[10px] text-[#64748b] font-mono">{item.patientId}</div>
                        </td>
                        <td className="px-3 font-mono text-[#2563eb] font-bold">{item.prescriptionId}</td>
                        <td className="px-3">
                          <div className="text-[#111827]">{item.date}</div>
                          <div className="text-[10px] text-[#64748b]">{item.time}</div>
                        </td>
                        <td className="px-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded border ${
                            item.status === 'Fully Dispensed' 
                              ? 'text-emerald-700 border-emerald-200 bg-emerald-50' 
                              : 'text-amber-700 border-amber-200 bg-amber-50'
                          }`}>
                            {item.status.split(' ')[0]}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-xs font-semibold text-[#64748b]">
                        No dispensation history records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-3 text-xs font-semibold text-[#64748b] shrink-0">
              <span>Showing {filteredHistory.length} of {history.length} entries</span>
              <div className="flex gap-1">
                <button className="px-2 py-1 border border-[#cbd1da] rounded text-[#94a3b8]" disabled>&lt;</button>
                <button className="px-2.5 py-1 bg-[#111827] text-white rounded font-bold">1</button>
                <button className="px-2 py-1 border border-[#cbd1da] rounded text-[#94a3b8]" disabled>&gt;</button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-[#d5d9e0] rounded p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#f1f5f9] flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-[#475569]" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#111827] leading-tight">{stats.total}</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] mt-0.5">Total</p>
              </div>
            </div>
            <div className="bg-white border border-[#d5d9e0] rounded p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#e0f2fe] flex items-center justify-center flex-shrink-0">
                <Check size={16} className="text-[#2563eb]" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#111827] leading-tight">{stats.fully}</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] mt-0.5">Full</p>
              </div>
            </div>
            <div className="bg-white border border-[#d5d9e0] rounded p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#111827] leading-tight">{stats.partially}</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] mt-0.5">Partial</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: History Details */}
        <div className="bg-white border border-[#d5d9e0] rounded p-6 flex flex-col min-h-[580px]">
          {selectedItem ? (
            <>
              <h3 className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider mb-4 border-b border-[#e2e8f0] pb-2">
                DISPENSED DETAILS
              </h3>
              
              {/* Patient Info */}
              <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-[#f1f5f9] border border-[#cbd5e1] flex items-center justify-center text-[#475569] shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-[#111827] leading-snug">{selectedItem.patientName}</h2>
                    <div className="text-xs font-semibold text-[#64748b] flex gap-2 mt-0.5">
                      <span className="font-mono text-[#2563eb] font-bold">{selectedItem.patientId}</span>
                      <span>•</span>
                      <span>{selectedItem.age}</span>
                      <span>•</span>
                      <span>{selectedItem.gender}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569] block mb-1">Dispensed Date</span>
                  <div className="flex items-center gap-2 border border-[#cbd1da] rounded px-3 py-1 text-xs font-bold text-[#111827] bg-[#f8fafc]">
                    <span>{selectedItem.date}</span>
                    <Calendar size={12} className="text-[#64748b]" />
                  </div>
                </div>
              </div>

              {/* Diagnosis & Doctor & Dispenser */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569] block mb-1">Diagnosis</span>
                  <div className="border border-[#cbd1da] rounded p-2 text-xs font-bold text-[#111827] bg-[#f8fafc]">
                    {selectedItem.diagnosis}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569] block mb-1">Doctor</span>
                  <div className="border border-[#cbd1da] rounded p-2 text-xs font-bold text-[#111827] bg-[#f8fafc]">
                    {selectedItem.doctor}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569] block mb-1">Dispenser</span>
                  <div className="border border-[#cbd1da] rounded p-2 text-xs font-bold text-[#111827] bg-[#f8fafc]">
                    {selectedItem.dispenser}
                  </div>
                </div>
              </div>

              {/* Prescribed vs Dispensed Medicines */}
              <div className="mb-5 flex-1 overflow-y-auto">
                <h4 className="text-[10px] font-extrabold text-[#475569] uppercase tracking-wider mb-2 border-b border-[#e2e8f0] pb-1">
                  DISPENSED MEDICINES LOG
                </h4>
                <div className="border border-[#cbd1da] rounded overflow-hidden">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f1f2f4] border-b border-[#cbd1da] text-[10px] font-extrabold uppercase tracking-wider text-[#475569] h-9">
                        <th className="px-3 w-8">#</th>
                        <th className="px-3">DRUG NAME</th>
                        <th className="px-3 text-center">PRESCRIBED</th>
                        <th className="px-3 text-center">DISPENSED</th>
                        <th className="px-3 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0] font-semibold text-[#111827]">
                      {selectedItem.drugs.map((drug, index) => {
                        const isPartial = drug.dispensedQty < drug.prescribedQty;
                        return (
                          <tr key={index} className="h-11 hover:bg-[#f8fafc]">
                            <td className="px-3 font-bold text-[#475569]">{index + 1}</td>
                            <td className="px-3">
                              <p className="font-extrabold text-[#111827]">{drug.name}</p>
                              <p className="text-[10px] text-[#64748b]">{drug.type}</p>
                            </td>
                            <td className="px-3 text-center text-[#475569] font-bold">{drug.prescribedQty}</td>
                            <td className={`px-3 text-center font-extrabold ${isPartial ? 'text-amber-700' : 'text-[#111827]'}`}>
                              {drug.dispensedQty}
                            </td>
                            <td className="px-3 text-right">
                              {drug.dispensedQty === 0 ? (
                                <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded border border-red-200 bg-red-50 text-red-700">
                                  Out of Stock
                                </span>
                              ) : isPartial ? (
                                <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded border border-amber-200 bg-amber-50 text-amber-700">
                                  Partial
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded border border-emerald-200 bg-emerald-50 text-emerald-700">
                                  Dispensed
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-[#f8fafc] border border-[#cbd1da] rounded p-3 mb-5 shrink-0">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569] mb-1">DISPENSATION NOTES</p>
                <p className="text-xs font-semibold text-[#334155] italic">
                  {selectedItem.notes || "No custom notes entered during dispensation."}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto shrink-0 border-t border-[#e2e8f0] pt-4">
                <button 
                  onClick={() => handlePrint(selectedItem)}
                  className="flex-1 py-2.5 text-xs font-extrabold text-white bg-[#111827] border border-[#111827] rounded hover:bg-[#1f2937] transition-colors flex items-center justify-center gap-2"
                >
                  <Printer size={14} /> <span>PRINT RECEIPT</span>
                </button>
                <button 
                  onClick={() => handleDownload(selectedItem)}
                  className="flex-1 py-2.5 text-xs font-extrabold text-[#111827] bg-white border border-[#cbd1da] rounded hover:bg-[#f3f4f6] transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={14} /> <span>EXPORT RECORD</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#64748b]">
              <FileText size={40} className="text-[#cbd5e1] mb-2" />
              <p className="text-xs font-semibold">Select a prescription record from the logs to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
