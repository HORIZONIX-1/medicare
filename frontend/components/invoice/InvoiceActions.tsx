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
    <div className="flex justify-end gap-4">

      <button
        onClick={printInvoice}
        className="btn-cyan"
      >
        Print Invoice
      </button>

      <button
        onClick={createInvoice}
        className="opd-submit-btn"
      >
        Finish Visit
      </button>

    </div>
  );
}