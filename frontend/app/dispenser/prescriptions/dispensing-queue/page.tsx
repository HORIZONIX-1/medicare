"use client";

import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import {
  DispensingQueueTable,
  QueueItem,
  DispensingDetailsPanel,
  DispensingActions,
  DispensingStatsCards,
} from '@/components/prescription';

const MOCK_QUEUES: QueueItem[] = [
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
  const [queues] = useState<QueueItem[]>(MOCK_QUEUES);
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(MOCK_QUEUES[0]);
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
        {/* Left Column: Queue Table & Stats */}
        <div className="flex flex-col gap-6">
          <DispensingQueueTable
            queues={filteredQueues}
            selectedItem={selectedItem}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setCustomNotes('');
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <DispensingStatsCards
            total={18}
            pendingOrFull={12}
            dispensedOrPartial={6}
            type="queue"
          />
        </div>

        {/* Right Column: Prescription Details & Actions */}
        <div className="flex flex-col">
          <DispensingDetailsPanel
            selectedItem={selectedItem}
            customNotes={customNotes}
            onNotesChange={setCustomNotes}
            isHistory={false}
          />
          {selectedItem && (
            <DispensingActions
              type="queue"
              onDispenseFull={() => handleDispense('full')}
              onDispensePartial={() => handleDispense('partial')}
              onCancel={() => handleDispense('cancel')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
