"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, AlertTriangle, FileText, Clock, Check, X, User } from 'lucide-react';

interface DrugItem {
  name: string;
  strength: string;
  type: string;
  qty: number;
}

interface PrescriptionQueueItem {
  id: number;
  name: string;
  pid: string;
  date: string;
  age: string;
  gender: string;
  diagnosis: string;
  doctor: string;
  drugs: DrugItem[];
  alerts: string[];
  notes?: string;
}

const MOCK_QUEUES: PrescriptionQueueItem[] = [
  {
    id: 1,
    name: 'Kamal Perera',
    pid: 'P000123',
    date: '2026-06-07',
    age: '32 Years',
    gender: 'Male',
    diagnosis: 'Viral Fever',
    doctor: 'Dr. Kamal Perera',
    drugs: [
      { name: 'Paracetamol', strength: '500mg', type: 'Tablet', qty: 10 },
      { name: 'Cetrizine', strength: '10mg', type: 'Tablet', qty: 20 },
      { name: 'Cough Syrup', strength: '100ml', type: 'Syrup', qty: 1 },
    ],
    alerts: [
      'Paracetamol 500mg is low in stock. Only 5 tablets available.',
      'Cough Syrup 100ml is out of stock.'
    ]
  },
  {
    id: 2,
    name: 'Nimal Silva',
    pid: 'P000124',
    date: '2026-06-07',
    age: '41 Years',
    gender: 'Male',
    diagnosis: 'Chronic Gastritis',
    doctor: 'Dr. S. Alwis',
    drugs: [
      { name: 'Omeprazole', strength: '20mg', type: 'Capsule', qty: 14 },
      { name: 'Gaviscon Liquid', strength: '150ml', type: 'Liquid', qty: 2 }
    ],
    alerts: []
  },
  {
    id: 3,
    name: 'Dilini Fernando',
    pid: 'P000125',
    date: '2026-06-06',
    age: '29 Years',
    gender: 'Female',
    diagnosis: 'Allergic Asthma',
    doctor: 'Dr. R. Perera',
    drugs: [
      { name: 'Salbutamol Inhaler', strength: '100mcg', type: 'Inhaler', qty: 1 },
      { name: 'Prednisolone', strength: '5mg', type: 'Tablet', qty: 10 }
    ],
    alerts: [
      'Prednisolone 5mg is low in stock. Only 8 tablets available.'
    ]
  },
  {
    id: 4,
    name: 'Saman Wijesinghe',
    pid: 'P000126',
    date: '2026-06-06',
    age: '55 Years',
    gender: 'Male',
    diagnosis: 'Hypertension',
    doctor: 'Dr. S. Alwis',
    drugs: [
      { name: 'Amlodipine', strength: '5mg', type: 'Tablet', qty: 30 },
      { name: 'Losartan', strength: '50mg', type: 'Tablet', qty: 30 }
    ],
    alerts: []
  },
  {
    id: 5,
    name: 'Chathuri Desilva',
    pid: 'P000127',
    date: '2026-06-05',
    age: '34 Years',
    gender: 'Female',
    diagnosis: 'Acute Tonsillitis',
    doctor: 'Dr. Kamal Perera',
    drugs: [
      { name: 'Amoxicillin', strength: '250mg', type: 'Capsule', qty: 21 },
      { name: 'Paracetamol', strength: '500mg', type: 'Tablet', qty: 15 }
    ],
    alerts: [
      'Paracetamol 500mg is low in stock. Only 5 tablets available.'
    ]
  },
  {
    id: 6,
    name: 'Ramesh Bandara',
    pid: 'P000128',
    date: '2026-06-05',
    age: '48 Years',
    gender: 'Male',
    diagnosis: 'Diabetes Mellitus',
    doctor: 'Dr. R. Perera',
    drugs: [
      { name: 'Metformin', strength: '500mg', type: 'Tablet', qty: 60 },
      { name: 'Atorvastatin', strength: '10mg', type: 'Tablet', qty: 30 }
    ],
    alerts: []
  }
];

export default function DispensingQueue() {
  const [queues] = useState<PrescriptionQueueItem[]>(MOCK_QUEUES);
  const [selectedItem, setSelectedItem] = useState<PrescriptionQueueItem | null>(MOCK_QUEUES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDispense = (type: 'full' | 'partial' | 'cancel') => {
    if (!selectedItem) return;
    if (type === 'full') {
      showToast(`Prescription dispensed successfully for ${selectedItem.name}!`);
    } else if (type === 'partial') {
      showToast(`Prescription marked as partially dispensed for ${selectedItem.name}.`);
    } else {
      showToast(`Dispensation cancelled for ${selectedItem.name}.`);
    }
  };

  const filteredQueues = useMemo(() => {
    return queues.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pid.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [queues, searchQuery]);

  React.useEffect(() => {
    if (filteredQueues.length > 0) {
      if (!selectedItem || !filteredQueues.some(item => item.id === selectedItem.id)) {
        setSelectedItem(filteredQueues[0]);
      }
    } else {
      setSelectedItem(null);
    }
  }, [filteredQueues, selectedItem]);

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
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">Prescriptions / Dispensing</p>
        <h1 className="text-2xl font-extrabold text-[#111827] mt-0.5">Prescription Dispensing Queue</h1>
        <p className="text-xs font-medium text-[#64748b] mt-0.5">View pending prescriptions and dispense medicines to patients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Queue List */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-[#d5d9e0] rounded p-6 h-[550px] flex flex-col">
            <h3 className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider mb-3">PRESCRIPTION QUEUE</h3>
            
            {/* Search & Filter */}
            <div className="flex gap-2 mb-4 shrink-0">
              <div className="relative flex-1 flex border border-[#cbd1da] rounded bg-white px-3 items-center">
                <Search size={14} className="text-[#64748b] mr-2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Patient Name / ID" 
                  className="border-none w-full h-9 text-xs font-semibold outline-none text-[#111827]"
                />
              </div>
              <button className="h-9 px-4 text-xs font-extrabold text-white bg-[#111827] border border-[#111827] rounded hover:bg-[#1f2937] transition-colors">
                SEARCH
              </button>
              <button className="h-9 w-9 flex items-center justify-center border border-[#cbd1da] bg-white text-[#111827] rounded hover:bg-[#f3f4f6] transition-colors">
                <Filter size={14} />
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto border border-[#cbd1da] rounded">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f1f2f4] border-b border-[#cbd1da] text-[10px] font-extrabold uppercase tracking-wider text-[#475569] h-10">
                    <th className="px-3 w-10">#</th>
                    <th className="px-3">PATIENT NAME</th>
                    <th className="px-3">PATIENT ID</th>
                    <th className="px-3">DATE</th>
                    <th className="px-3 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] text-xs font-semibold text-[#111827]">
                  {filteredQueues.length > 0 ? (
                    filteredQueues.map((row, idx) => (
                      <tr 
                        key={row.id} 
                        onClick={() => {
                          setSelectedItem(row);
                          setCustomNotes('');
                        }}
                        className={`h-11 cursor-pointer transition-colors ${
                          selectedItem?.id === row.id ? 'bg-[#f1f5f9] font-bold' : 'hover:bg-[#f8fafc]'
                        }`}
                      >
                        <td className="px-3 font-bold text-[#475569]">{idx + 1}</td>
                        <td className="px-3 font-extrabold text-[#111827]">{row.name}</td>
                        <td className="px-3 font-mono text-[#2563eb] font-bold">{row.pid}</td>
                        <td className="px-3 text-[#475569]">{row.date}</td>
                        <td className="px-3 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded border border-amber-200 bg-amber-50 text-amber-700">
                            Pending
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-xs font-semibold text-[#64748b]">
                        No pending prescriptions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-3 text-xs font-semibold text-[#64748b] shrink-0">
              <span>Showing {filteredQueues.length} of {queues.length} entries</span>
              <div className="flex gap-1">
                <button className="px-2 py-1 border border-[#cbd1da] rounded text-[#94a3b8]" disabled>&lt;</button>
                <button className="px-2.5 py-1 bg-[#111827] text-white rounded font-bold">1</button>
                <button className="px-2 py-1 border border-[#cbd1da] rounded text-[#94a3b8]" disabled>&gt;</button>
              </div>
            </div>
          </div>

          {/* Stats Bottom Left */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-[#d5d9e0] rounded p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#f1f5f9] flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-[#475569]" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#111827] leading-tight">18</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] mt-0.5">Total</p>
              </div>
            </div>
            <div className="bg-white border border-[#d5d9e0] rounded p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#111827] leading-tight">12</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] mt-0.5">Pending</p>
              </div>
            </div>
            <div className="bg-white border border-[#d5d9e0] rounded p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#e0f2fe] flex items-center justify-center flex-shrink-0">
                <Check size={16} className="text-[#2563eb]" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#111827] leading-tight">6</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748b] mt-0.5">Dispensed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prescription Details */}
        <div className="bg-white border border-[#d5d9e0] rounded p-6 flex flex-col min-h-[580px]">
          {selectedItem ? (
            <>
              <h3 className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider mb-4 border-b border-[#e2e8f0] pb-2">
                PRESCRIPTION DETAILS
              </h3>
              
              {/* Patient Info Banner */}
              <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-[#f1f5f9] border border-[#cbd5e1] flex items-center justify-center text-[#475569] shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-[#111827] leading-snug">{selectedItem.name}</h2>
                    <div className="text-xs font-semibold text-[#64748b] flex gap-2 mt-0.5">
                      <span className="font-mono text-[#2563eb] font-bold">{selectedItem.pid}</span>
                      <span>•</span>
                      <span>{selectedItem.age}</span>
                      <span>•</span>
                      <span>{selectedItem.gender}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569] block mb-1">Prescription Date</span>
                  <div className="flex items-center gap-2 border border-[#cbd1da] rounded px-3 py-1 text-xs font-bold text-[#111827] bg-[#f8fafc]">
                    <span>{selectedItem.date}</span>
                    <Calendar size={12} className="text-[#64748b]" />
                  </div>
                </div>
              </div>

              {/* Diagnosis & Doctor */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569] block mb-1">Diagnosis</span>
                  <div className="border border-[#cbd1da] rounded p-2 text-xs font-bold text-[#111827] bg-[#f8fafc]">
                    {selectedItem.diagnosis}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569] block mb-1">Prescribing Doctor</span>
                  <div className="border border-[#cbd1da] rounded p-2 text-xs font-bold text-[#111827] bg-[#f8fafc]">
                    {selectedItem.doctor}
                  </div>
                </div>
              </div>

              {/* Prescribed Medicines */}
              <div className="flex-1 mb-5 overflow-y-auto">
                <h4 className="text-[10px] font-extrabold text-[#475569] uppercase tracking-wider mb-2 border-b border-[#e2e8f0] pb-1">
                  PRESCRIBED MEDICINES
                </h4>
                <div className="border border-[#cbd1da] rounded overflow-hidden">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f1f2f4] border-b border-[#cbd1da] text-[10px] font-extrabold uppercase tracking-wider text-[#475569] h-9">
                        <th className="px-3 w-8">#</th>
                        <th className="px-3">DRUG NAME</th>
                        <th className="px-3">STRENGTH / FORM</th>
                        <th className="px-3 w-20 text-center">QTY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0] font-semibold text-[#111827]">
                      {selectedItem.drugs.map((drug, index) => (
                        <tr key={index} className="h-10 hover:bg-[#f8fafc]">
                          <td className="px-3 font-bold text-[#475569]">{index + 1}</td>
                          <td className="px-3 font-extrabold text-[#111827]">{drug.name}</td>
                          <td className="px-3 text-[#475569]">{drug.strength} / {drug.type}</td>
                          <td className="px-3 text-center font-extrabold text-[#2563eb]">{drug.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Alerts */}
              {selectedItem.alerts && selectedItem.alerts.length > 0 && (
                <div className="flex gap-3 p-3 border border-red-200 rounded bg-red-50 mb-4 shrink-0">
                  <AlertTriangle size={16} className="text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-extrabold text-red-700 uppercase tracking-wider block mb-1">SAFETY ALERTS</span>
                    <ul className="text-xs font-semibold text-red-700 list-disc pl-4 space-y-0.5">
                      {selectedItem.alerts.map((alert, idx) => (
                        <li key={idx}>{alert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="mb-5 shrink-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569] block mb-1">NOTES (OPTIONAL)</span>
                <textarea 
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Enter notes..." 
                  className="w-full h-16 p-2 rounded border border-[#cbd1da] bg-white text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto border-t border-[#e2e8f0] pt-4 shrink-0">
                <button 
                  onClick={() => handleDispense('full')}
                  className="flex-1 py-2.5 text-xs font-extrabold text-white bg-[#111827] border border-[#111827] rounded hover:bg-[#1f2937] transition-colors"
                >
                  DISPENSE AVAILABLE
                </button>
                <button 
                  onClick={() => handleDispense('partial')}
                  className="flex-1 py-2.5 text-xs font-extrabold text-[#111827] bg-white border border-[#cbd1da] rounded hover:bg-[#f3f4f6] transition-colors"
                >
                  MARK AS PARTIAL
                </button>
                <button 
                  onClick={() => handleDispense('cancel')}
                  className="px-4 py-2.5 text-xs font-extrabold text-red-600 bg-white border border-red-200 rounded hover:bg-red-50 transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#64748b]">
              <FileText size={40} className="text-[#cbd5e1] mb-2" />
              <p className="text-xs font-semibold">Select a prescription record from the queue to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
