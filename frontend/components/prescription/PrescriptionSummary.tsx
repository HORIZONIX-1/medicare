"use client";

import api from "@/lib/axios";

interface Props {
  items: any[];

  consultationId: number;
}

export default function PrescriptionSummary({
  items,
  consultationId,
}: Props) {

  const total =
    items.reduce(
      (sum, item) =>
        sum +
        (item.price * item.quantity),
      0
    );

  const savePrescription =
    async () => {

    try {

      await api.post(
        "/prescriptions",
        {
          consultation_id:
            consultationId,

          total_amount: total,

          items,
        }
      );

      alert(
        "Prescription saved"
      );

    } catch (error: any) {

      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 text-slate-100 shadow-xl shadow-slate-950/30 backdrop-blur-xl xl:sticky xl:top-6 self-start">

      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
        Billing Summary
      </p>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4">

        <h2 className="text-base font-semibold text-slate-300">
          Total:
        </h2>

        <h2 className="text-3xl font-bold text-white">
          Rs.{total}
        </h2>

      </div>

      <p className="mt-4 text-sm text-slate-400">
        Review the total before saving the prescription and generating the invoice.
      </p>

      <div className="mt-5 flex justify-end">

        <button
          onClick={savePrescription}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-cyan-400"
        >
          Proceed to Invoice
        </button>

      </div>

    </div>
  );
}