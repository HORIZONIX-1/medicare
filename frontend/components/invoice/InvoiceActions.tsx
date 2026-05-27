"use client";

import api from "@/lib/axios";

interface Props {

  prescription: any;

  doctorFee: number;

  discount: number;

  finalTotal: number;

  patientDenied: boolean;
}

export default function InvoiceActions({

  prescription,

  doctorFee,

  discount,

  finalTotal,

  patientDenied,
}: Props) {

  const createInvoice =
    async () => {

    try {

      const drugTotal =
        prescription.items.reduce(
          (sum: number, item: any) =>
            sum +
            (item.price * item.quantity),
          0
        );

      const response =
        await api.post(
          "/invoices",
          {

            consultation_id:
              prescription.consultation_id,

            prescription_id:
              prescription.prescription_id,

            total_drug_cost:
              drugTotal,

            doctor_fee:
              doctorFee,

            discount,

            total_amount:
              finalTotal,

            is_patient_denied:
              patientDenied,
          }
        );

      alert(
        "Invoice Created"
      );

      const invoiceId =
        response.data.invoice_id;

      await api.post(
        `/invoices/${invoiceId}/finalize`
      );

      alert(
        "Visit Completed"
      );

    } catch (error: any) {

      console.error(error);

      alert(
        error.response?.data?.message
      );
    }
  };

  const printInvoice =
    () => {

    window.print();
  };

  return (
    <div className="mt-6 flex justify-end gap-4">

      <button
        onClick={printInvoice}
        className="rounded-lg border border-slate-700 bg-slate-900 px-6 py-3 text-slate-100 transition hover:bg-slate-800"
      >
        Print Invoice
      </button>

      <button
        onClick={createInvoice}
        className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
      >
        Finish Visit
      </button>

    </div>
  );
}