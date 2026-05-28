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
      <div className="opd-loading-container">
        <div className="spinner" />
        <p className="opd-loading-text">Loading invoice...</p>
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
    <div className="opd-page">
      <div className="opd-orb opd-orb-1" />
      <div className="opd-orb opd-orb-2" />
      <div className="opd-orb opd-orb-3" />
      <div className="opd-grid-lines" />

      <header className="opd-header">
        <div className="opd-header-content">
          <div className="opd-header-left">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="opd-back-btn"
              title="Go back"
            >
              ←
            </button>
            <div>
              <h1 className="opd-header-title">Invoice</h1>
              <p className="opd-header-subtitle">Billing & Print</p>
            </div>
          </div>
          <div className="opd-header-right">
            <div className="opd-header-badge">
              <span className="opd-header-badge-dot" />
              {prescription?.prescription_id || 'Invoice'}
            </div>
          </div>
        </div>
      </header>

      <main className="opd-main">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">

          <div className="card-modern">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="card-title mb-2">Invoice & Print</h2>
                <p className="text-sm text-slate-400">Review medication costs, doctor fee, discounts, and finalize the visit.</p>
              </div>
            </div>
          </div>

          <div className="card-modern">
            <InvoiceDrugTable
              items={prescription.items}
            />
          </div>

          <div className="card-modern">
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
          </div>

          <div className="card-modern">
            <InvoiceActions
              prescription={prescription}

              doctorFee={doctorFee}

              discount={discount}

              finalTotal={finalTotal}

              patientDenied={patientDenied}
            />
          </div>
        </div>
      </main>

    </div>
  );
}