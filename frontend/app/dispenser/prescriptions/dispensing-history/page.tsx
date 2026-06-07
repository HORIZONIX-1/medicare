"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, FileText, Clock, Check, Eye, Printer, Download, X } from 'lucide-react';

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
    showToast(`🔄 Connecting to pharmacy printer... Printing receipt for ${item.patientName} (${item.prescriptionId})`);
  };

  const handleDownload = (item: HistoryItem) => {
    showToast(`📥 Downloading PDF report for ${item.patientName} (${item.prescriptionId})`);
  };

  // Filters logic
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

  // Select first item if current selected is filtered out
  React.useEffect(() => {
    if (filteredHistory.length > 0) {
      if (!selectedItem || !filteredHistory.some(item => item.id === selectedItem.id)) {
        setSelectedItem(filteredHistory[0]);
      }
    } else {
      setSelectedItem(null);
    }
  }, [filteredHistory, selectedItem]);

  // Compute Stats
  const stats = useMemo(() => {
    const total = history.length;
    const fully = history.filter(item => item.status === 'Fully Dispensed').length;
    const partially = history.filter(item => item.status === 'Partially Dispensed').length;
    return { total, fully, partially };
  }, [history]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-xl border border-gray-800 flex items-center gap-3 animate-bounce">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white ml-2">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dispensing History</h1>
          <p className="text-sm text-gray-500 mt-1">Review past prescription dispensations and status logs.</p>
        </div>
        <div className="text-xs text-gray-400">
          Prescriptions &gt; Dispensing History
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: History Logs */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col h-[580px]">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">DISPENSATION LOGS</h3>
            
            {/* Search & Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 shrink-0">
              <div className="relative col-span-1 sm:col-span-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Patient / ID" 
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="All">All Dates</option>
                  <option value="Today">Today</option>
                  <option value="Yesterday">Yesterday</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto min-h-0 border border-gray-100 rounded-md">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">PATIENT NAME</th>
                    <th className="px-4 py-3 font-medium">PRESCRIPTION</th>
                    <th className="px-4 py-3 font-medium">DATE</th>
                    <th className="px-4 py-3 font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item, idx) => (
                      <tr 
                        key={item.id} 
                        onClick={() => setSelectedItem(item)}
                        className={`hover:bg-gray-50/60 cursor-pointer transition-colors ${
                          selectedItem?.id === item.id ? 'bg-blue-50/40 font-medium' : ''
                        }`}
                      >
                        <td className="px-4 py-3.5 text-gray-500">{idx + 1}</td>
                        <td className="px-4 py-3.5 text-gray-900">
                          <div>{item.patientName}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{item.patientId}</div>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-gray-600">{item.prescriptionId}</td>
                        <td className="px-4 py-3.5">
                          <div className="text-gray-700">{item.date}</div>
                          <div className="text-[10px] text-gray-400">{item.time}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full border uppercase ${
                            item.status === 'Fully Dispensed' 
                              ? 'text-green-700 border-green-200 bg-green-50' 
                              : 'text-orange-700 border-orange-200 bg-orange-50'
                          }`}>
                            {item.status.split(' ')[0]}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-400">
                        No dispensation history records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination / Total count */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-500 shrink-0">
              <span>Showing {filteredHistory.length} of {history.length} entries</span>
              <div className="flex gap-1">
                <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50" disabled>&lt;</button>
                <button className="w-7 h-7 flex items-center justify-center bg-gray-800 text-white rounded">1</button>
                <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50" disabled>&gt;</button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Dispensed</p>
              </div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <Check size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stats.fully}</p>
                <p className="text-xs text-gray-500">Fully Dispensed</p>
              </div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                <Clock size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stats.partially}</p>
                <p className="text-xs text-gray-500">Partially Dispensed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: History Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col h-full min-h-[640px]">
          {selectedItem ? (
            <>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                DISPENSED DETAILS
              </h3>
              
              {/* Patient Info */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{selectedItem.patientName}</h2>
                    <div className="text-xs text-gray-500 flex flex-wrap gap-x-3 gap-y-1 mt-1 font-medium">
                      <span className="font-mono text-gray-600">{selectedItem.patientId}</span>
                      <span>•</span>
                      <span>{selectedItem.age}</span>
                      <span>•</span>
                      <span>{selectedItem.gender}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">DISPENSED DATE</p>
                  <div className="flex items-center gap-2 border border-gray-200 rounded px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50/50">
                    <span>{selectedItem.date}</span>
                    <Calendar size={13} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Diagnosis & Doctor & Dispenser */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">DIAGNOSIS</p>
                  <div className="p-2 border border-gray-200 rounded-md text-xs font-medium text-gray-800 bg-gray-50/30">
                    {selectedItem.diagnosis}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">DOCTOR</p>
                  <div className="p-2 border border-gray-200 rounded-md text-xs font-medium text-gray-800 bg-gray-50/30">
                    {selectedItem.doctor}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">DISPENSER</p>
                  <div className="p-2 border border-gray-200 rounded-md text-xs font-medium text-gray-800 bg-gray-50/30">
                    {selectedItem.dispenser}
                  </div>
                </div>
              </div>

              {/* Prescribed vs Dispensed Medicines */}
              <div className="mb-6 flex-1 overflow-y-auto">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">
                  DISPENSED MEDICINES LOG
                </h4>
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] text-gray-400 uppercase bg-gray-50/30">
                    <tr>
                      <th className="py-2 px-2 font-medium w-8">#</th>
                      <th className="py-2 px-2 font-medium">DRUG NAME</th>
                      <th className="py-2 px-2 font-medium text-center">PRESCRIBED</th>
                      <th className="py-2 px-2 font-medium text-center">DISPENSED</th>
                      <th className="py-2 px-2 font-medium text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedItem.drugs.map((drug, index) => {
                      const isPartial = drug.dispensedQty < drug.prescribedQty;
                      return (
                        <tr key={index} className="hover:bg-gray-50/40">
                          <td className="py-3 px-2 text-gray-500">{index + 1}</td>
                          <td className="py-3 px-2">
                            <p className="font-semibold text-gray-900">{drug.name}</p>
                            <p className="text-[10px] text-gray-400">{drug.type}</p>
                          </td>
                          <td className="py-3 px-2 text-center text-gray-600 font-medium">{drug.prescribedQty}</td>
                          <td className={`py-3 px-2 text-center font-bold ${isPartial ? 'text-orange-600' : 'text-gray-900'}`}>
                            {drug.dispensedQty}
                          </td>
                          <td className="py-3 px-2 text-right">
                            {drug.dispensedQty === 0 ? (
                              <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 uppercase">
                                Out of Stock
                              </span>
                            ) : isPartial ? (
                              <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 uppercase">
                                Partial
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100 uppercase">
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

              {/* Notes */}
              <div className="bg-gray-50/60 border border-gray-100 rounded-lg p-3.5 mb-6 shrink-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">DISPENSATION NOTES</p>
                <p className="text-xs text-gray-700 italic">
                  {selectedItem.notes || "No custom notes entered during dispensation."}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto shrink-0 border-t border-gray-100 pt-4">
                <button 
                  onClick={() => handlePrint(selectedItem)}
                  className="flex-1 bg-gray-800 text-white font-semibold text-xs py-3 rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer size={14} /> PRINT RECEIPT
                </button>
                <button 
                  onClick={() => handleDownload(selectedItem)}
                  className="flex-1 border border-gray-300 text-gray-700 font-semibold text-xs py-3 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 bg-white"
                >
                  <Download size={14} /> EXPORT RECORD
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <FileText size={48} className="mb-2 text-gray-300" />
              <p className="text-sm">Select a prescription record from the logs to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
