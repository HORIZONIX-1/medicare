"use client";

import { use, useEffect, useState }
  from "react";

import api from "@/lib/axios";

import InvoiceSummary
  from "@/components/invoice/InvoiceSummary";

import InvoiceDrugTable
  from "@/components/invoice/InvoiceDrugTable";

import InvoiceActions
  from "@/components/invoice/InvoiceActions";

interface Props {
  params: Promise<{
    prescriptionId: string;
  }>;
}

export default function InvoicePage({
  params,
}: Props) {

  const resolvedParams = use(params);

  const [prescription, setPrescription] =
    useState<any>(null);

  const [doctorFee, setDoctorFee] =
    useState(500);

  const [discount, setDiscount] =
    useState(0);

  const [patientDenied, setPatientDenied] =
    useState(false);

  useEffect(() => {

    fetchPrescription();

  }, [resolvedParams.prescriptionId]);

  const fetchPrescription =
    async () => {

    const response =
      await api.get(
        `/prescriptions/${resolvedParams.prescriptionId}`
      );

    setPrescription(response.data);
  };

  if (!prescription) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
        Loading...
      </div>
    );
  }

  const drugTotal =
    prescription.items.reduce(
      (sum: number, item: any) =>
        sum +
        (item.price * item.quantity),
      0
    );

  const finalTotal =
    drugTotal +
    doctorFee -
    discount;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">

        <h1 className="text-2xl font-bold text-slate-50">
          Invoice & Print
        </h1>

        <InvoiceDrugTable
          items={prescription.items}
        />

        <InvoiceSummary
          drugTotal={drugTotal}

          doctorFee={doctorFee}
          setDoctorFee={setDoctorFee}

          discount={discount}
          setDiscount={setDiscount}

          patientDenied={patientDenied}
          setPatientDenied={
            setPatientDenied
          }

          finalTotal={finalTotal}
        />

        <InvoiceActions
          prescription={prescription}

          doctorFee={doctorFee}

          discount={discount}

          finalTotal={finalTotal}

          patientDenied={patientDenied}
        />
      </div>

    </div>
  );
}