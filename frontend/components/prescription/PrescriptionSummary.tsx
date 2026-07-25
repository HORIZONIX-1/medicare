"use client";

import { ArrowRight } from "lucide-react";
import api from "@/lib/axios";

interface Props {
  items: any[];
  consultationId: number;
}

export default function PrescriptionSummary({ items, consultationId }: Props) {
  const total = items.reduce(
    (sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)),
    0
  );

  const savePrescription = async () => {
    try {
      await api.post("/prescriptions", {
        consultation_id: consultationId,
        total_amount: total,
        items,
      });

      alert("Prescription saved successfully.");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to save prescription.");
    }
  };

  return (
    <div className="bg-white border border-[#d5d9e0] rounded p-5 text-[#111827] xl:sticky xl:top-6 self-start">
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
        Billing Summary
      </p>

      <div className="mt-4 flex items-center justify-between rounded border border-[#e2e8f0] bg-[#f8fafc] px-4 py-4">
        <h2 className="text-xs font-bold text-[#475569] uppercase tracking-wider">
          Total Amount:
        </h2>
        <h2 className="text-2xl font-extrabold text-[#111827]">
          Rs. {total.toFixed(2)}
        </h2>
      </div>

      <p className="mt-4 text-xs font-semibold text-[#64748b]">
        Review the calculated total before saving the prescription and proceeding to invoice generation.
      </p>

      <div className="mt-5 flex justify-end">
        <button
          onClick={savePrescription}
          className="inline-flex items-center justify-center gap-2 rounded border border-[#111827] bg-[#111827] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#1f2937]"
        >
          <span>Proceed to Invoice</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}