"use client";

import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import {
  DispensingHistoryTable,
  HistoryItem,
  DispensingDetailsPanel,
  DispensingActions,
  DispensingStatsCards,
} from '@/components/prescription';

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
        <p style={{ fontSize: "0.84375rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", margin: 0 }}>Prescriptions / History</p>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 900, color: "#000000", marginTop: "0.25rem", marginBottom: 0 }}>Dispensing History</h1>
        <p style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#000000", marginTop: "0.375rem" }}>Review past prescription dispensations and status logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: History Table & Stats */}
        <div className="flex flex-col gap-6">
          <DispensingHistoryTable
            history={filteredHistory}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
          />
          <DispensingStatsCards
            total={stats.total}
            pendingOrFull={stats.fully}
            dispensedOrPartial={stats.partially}
            type="history"
          />
        </div>

        {/* Right Column: History Details & Actions */}
        <div className="flex flex-col">
          <DispensingDetailsPanel
            selectedItem={selectedItem}
            isHistory={true}
          />
          {selectedItem && (
            <DispensingActions
              type="history"
              onPrint={() => handlePrint(selectedItem)}
              onDownload={() => handleDownload(selectedItem)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
