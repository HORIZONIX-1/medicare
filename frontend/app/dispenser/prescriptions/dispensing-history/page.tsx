"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  DispensingHistoryTable,
  HistoryItem,
  DispensingDetailsPanel,
  DispensingActions,
  DispensingStatsCards,
} from '@/components/prescription';
import { fetchPrescriptions, isDispensed, toHistoryItem, toLocalDateKey } from '@/lib/dispensing';

export default function DispensingHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    fetchPrescriptions()
      .then((all) => setHistory(all.filter(isDispensed).map(toHistoryItem)))
      .catch((error) => {
        console.error(error);
        showToast('Could not load dispensing history.');
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = (item: HistoryItem) => {
    const rows = [
      ['Prescription', item.prescriptionId],
      ['Date', `${item.date} ${item.time}`],
      ['Patient', `${item.patientName} (${item.patientId})`],
      ['Doctor', item.doctor],
      ['Diagnosis', item.diagnosis],
      ['Status', item.status],
      [],
      ['Drug', 'Dosage', 'Prescribed', 'Dispensed'],
      ...item.drugs.map((d) => [d.name, d.type, String(d.prescribedQty), String(d.dispensedQty)]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.prescriptionId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${item.prescriptionId}`);
  };

  const filteredHistory = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const todayKey = toLocalDateKey(today);
    const yesterdayKey = toLocalDateKey(yesterday);
    const q = searchQuery.toLowerCase();

    return history.filter((item) => {
      const matchesSearch =
        item.patientName.toLowerCase().includes(q) ||
        item.patientId.toLowerCase().includes(q) ||
        item.prescriptionId.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'All' ||
        item.status === statusFilter;

      const matchesDate =
        dateFilter === 'All' ||
        (dateFilter === 'Today' && item.date === todayKey) ||
        (dateFilter === 'Yesterday' && item.date === yesterdayKey) ||
        (dateFilter !== 'Today' && dateFilter !== 'Yesterday');

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [history, searchQuery, statusFilter, dateFilter]);

  const selectedItem =
    filteredHistory.find(item => item.id === selectedId) ?? filteredHistory[0] ?? null;

  const stats = useMemo(() => {
    const total = history.length;
    const fully = history.filter(item => item.status === 'Fully Dispensed').length;
    const declined = history.filter(item => item.status === 'Declined').length;
    return { total, fully, declined };
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
            onSelectItem={(item) => setSelectedId(item.id)}
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
            dispensedOrPartial={stats.declined}
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
              onPrint={handlePrint}
              onDownload={() => handleDownload(selectedItem)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
