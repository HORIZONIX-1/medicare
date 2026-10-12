"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import {
  DispensingQueueTable,
  QueueItem,
  DispensingDetailsPanel,
  DispensingActions,
  DispensingStatsCards,
} from '@/components/prescription';
import api from '@/lib/axios';
import { ApiPrescription, fetchPrescriptions, isDispensed, toQueueItem } from '@/lib/dispensing';

export default function DispensingQueue() {
  const [prescriptions, setPrescriptions] = useState<ApiPrescription[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const loadQueue = useCallback(async () => {
    try {
      const all = await fetchPrescriptions();
      setPrescriptions(all.filter((p) => !isDispensed(p)));
    } catch (error) {
      console.error(error);
      showToast('Could not load the dispensing queue.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  const queues = useMemo<QueueItem[]>(() => prescriptions.map(toQueueItem), [prescriptions]);

  const filteredQueues = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return queues.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.pid.toLowerCase().includes(q)
    );
  }, [queues, searchQuery]);

  // Keep a valid selection without an effect: fall back to the first visible row
  const selectedItem =
    filteredQueues.find(item => item.id === selectedId) ?? filteredQueues[0] ?? null;
  const selectedPrescription = prescriptions.find(p => p.prescription_id === selectedItem?.id);
  const invoice = selectedPrescription?.invoice;

  const handleDispense = async () => {
    if (!selectedItem || !invoice || submitting) return;
    setSubmitting(true);
    try {
      await api.post(`/invoices/${invoice.invoice_id}/finalize`);
      showToast(`Prescription dispensed for ${selectedItem.name}.`);
      setCustomNotes('');
      await loadQueue();
    } catch (error) {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      showToast(message || 'Failed to dispense prescription.');
    } finally {
      setSubmitting(false);
    }
  };

  const awaitingBilling = queues.filter(item => !prescriptions.find(p => p.prescription_id === item.id)?.invoice).length;


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
        <p style={{ fontSize: "0.84375rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", margin: 0 }}>Prescriptions / Dispensing</p>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 900, color: "#000000", marginTop: "0.25rem", marginBottom: 0 }}>Prescription Dispensing Queue</h1>
        <p style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#000000", marginTop: "0.375rem" }}>View pending prescriptions and dispense medicines to patients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Queue Table & Stats */}
        <div className="flex flex-col gap-6">
          <DispensingQueueTable
            queues={filteredQueues}
            selectedItem={selectedItem}
            onSelectItem={(item) => {
              setSelectedId(item.id);
              setCustomNotes('');
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          {loading && (
            <p className="text-sm font-semibold text-slate-500">Loading prescriptions...</p>
          )}
          <DispensingStatsCards
            total={queues.length}
            pendingOrFull={awaitingBilling}
            dispensedOrPartial={queues.length - awaitingBilling}
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
              onDispenseFull={handleDispense}
              dispenseDisabled={!invoice || submitting}
              dispenseLabel={!invoice ? 'AWAITING BILLING' : submitting ? 'DISPENSING...' : 'DISPENSE & FINALIZE'}
            />
          )}
        </div>
      </div>
    </div>
  );
}
