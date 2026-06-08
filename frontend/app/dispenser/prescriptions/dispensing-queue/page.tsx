"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, AlertTriangle, FileText, Clock, Check, X } from 'lucide-react';

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
  const [queues, setQueues] = useState<PrescriptionQueueItem[]>(MOCK_QUEUES);
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
      showToast(`✅ Prescription dispensed successfully for ${selectedItem.name}!`);
    } else if (type === 'partial') {
      showToast(`⚠️ Prescription marked as partially dispensed for ${selectedItem.name}.`);
    } else {
      showToast(`❌ Dispensation cancelled for ${selectedItem.name}.`);
    }
  };

  const filteredQueues = useMemo(() => {
    return queues.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pid.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [queues, searchQuery]);

  // Keep selected item updated if search results change
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
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-gray-950 text-white text-sm px-4 py-3 rounded-lg shadow-xl border border-gray-800 flex items-center gap-3 animate-bounce">
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
          <h1 className="text-2xl font-bold text-gray-900">Prescription Dispensing</h1>
          <p className="text-sm text-gray-500 mt-1">View pending prescriptions and dispense medicines to patients.</p>
        </div>
        <div className="text-xs text-gray-400">
          Prescriptions &gt; Dispensing Queue
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Queue List */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col h-[520px]">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">PRESCRIPTION QUEUE</h3>
            
            {/* Search & Filter */}
            <div className="flex gap-2 mb-4 shrink-0">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Patient Name / ID" 
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                SEARCH
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
                <Filter size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto min-h-0 border border-gray-100 rounded-md">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">PATIENT NAME</th>
                    <th className="px-4 py-3 font-medium">PRESCRIPTION ID</th>
                    <th className="px-4 py-3 font-medium">DATE</th>
                    <th className="px-4 py-3 font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {filteredQueues.length > 0 ? (
                    filteredQueues.map((row, idx) => (
                      <tr 
                        key={row.id} 
                        onClick={() => {
                          setSelectedItem(row);
                          setCustomNotes('');
                        }}
                        className={`hover:bg-gray-50/70 cursor-pointer transition-colors ${
                          selectedItem?.id === row.id ? 'bg-blue-50/40 font-medium' : ''
                        }`}
                      >
                        <td className="px-4 py-3.5 text-gray-500">{idx + 1}</td>
                        <td className="px-4 py-3.5 text-gray-900 font-medium">{row.name}</td>
                        <td className="px-4 py-3.5 text-gray-600 font-mono">{row.pid}</td>
                        <td className="px-4 py-3.5 text-gray-600">{row.date}</td>
                        <td className="px-4 py-3.5">
                          <span className="px-2 py-0.5 text-[9px] font-bold text-orange-700 bg-orange-50 border border-orange-200 rounded-full uppercase">
                            Pending
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-400">
                        No pending prescriptions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-500 shrink-0">
              <span>Showing {filteredQueues.length} of {queues.length} entries</span>
              <div className="flex gap-1">
                <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50" disabled>&lt;</button>
                <button className="w-7 h-7 flex items-center justify-center bg-gray-800 text-white rounded">1</button>
                <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50" disabled>&gt;</button>
              </div>
            </div>
          </div>

          {/* Stats Bottom Left */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <FileText size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xl font-bold">18</p>
                <p className="text-xs text-gray-500">Total Prescriptions</p>
              </div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <Clock size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xl font-bold">12</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <Check size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xl font-bold">6</p>
                <p className="text-xs text-gray-500">Dispensed Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prescription Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col h-full min-h-[580px]">
          {selectedItem ? (
            <>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">PRESCRIPTION DETAILS</h3>
              
              {/* Patient Info */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{selectedItem.name}</h2>
                    <div className="text-xs text-gray-500 flex gap-3 mt-1 font-medium">
                      <span className="font-mono text-gray-600">{selectedItem.pid}</span>
                      <span>•</span>
                      <span>{selectedItem.age}</span>
                      <span>•</span>
                      <span>{selectedItem.gender}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">DATE</p>
                  <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50/50">
                    <span>{selectedItem.date}</span>
                    <Calendar size={13} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Diagnosis & Doctor */}
              <div className="grid grid-cols-2 gap-4 mb-6 shrink-0">
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
              </div>

              {/* Prescribed Medicines */}
              <div className="mb-6 flex-1 overflow-y-auto">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">PRESCRIBED MEDICINES</h4>
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] text-gray-400 uppercase bg-gray-50/30">
                    <tr>
                      <th className="py-2 px-2 font-medium w-8">#</th>
                      <th className="py-2 px-2 font-medium">DRUG NAME</th>
                      <th className="py-2 px-2 font-medium">STRENGTH / FORM</th>
                      <th className="py-2 px-2 font-medium text-center">PRESCRIBED QTY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {selectedItem.drugs.map((drug, index) => (
                      <tr key={index} className="hover:bg-gray-50/40">
                        <td className="py-3 px-2 text-gray-500">{index + 1}</td>
                        <td className="py-3 px-2 font-semibold text-gray-900">{drug.name}</td>
                        <td className="py-3 px-2 text-gray-600">{drug.strength} / {drug.type}</td>
                        <td className="py-3 px-2 text-center font-bold text-gray-800">{drug.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Alerts */}
              {selectedItem.alerts && selectedItem.alerts.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-md p-3.5 flex gap-3 mb-4 shrink-0">
                  <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1">ALERTS</p>
                    <ul className="text-xs text-red-600 space-y-1 list-disc pl-3">
                      {selectedItem.alerts.map((alert, idx) => (
                        <li key={idx}>{alert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="mb-6 shrink-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">NOTES (OPTIONAL)</p>
                <textarea 
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Enter notes..." 
                  className="w-full p-3 border border-gray-200 rounded-md text-xs min-h-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto shrink-0 border-t border-gray-100 pt-4">
                <button 
                  onClick={() => handleDispense('full')}
                  className="flex-1 bg-gray-800 text-white font-semibold text-xs py-3 rounded-md hover:bg-gray-900 transition-colors"
                >
                  DISPENSE AVAILABLE
                </button>
                <button 
                  onClick={() => handleDispense('partial')}
                  className="flex-1 border border-gray-300 text-gray-700 font-semibold text-xs py-3 rounded-md hover:bg-gray-50 transition-colors"
                >
                  MARK AS PARTIAL
                </button>
                <button 
                  onClick={() => handleDispense('cancel')}
                  className="border border-gray-300 text-gray-700 font-semibold text-xs py-3 px-6 rounded-md hover:bg-gray-50 transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <FileText size={48} className="mb-2 text-gray-300" />
              <p className="text-sm">Select a prescription record from the queue to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
