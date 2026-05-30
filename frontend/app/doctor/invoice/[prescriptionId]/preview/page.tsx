"use client";

import { use, useEffect, useRef, useState }
  from "react";

import api from "@/lib/axios";

import { useSearchParams, useRouter }
  from "next/navigation";

import { useReactToPrint }
  from "react-to-print";

import jsPDF from "jspdf";

import html2canvas
  from "html2canvas";

import PrintableInvoice
  from "@/components/invoice/PrintableInvoice";

import PrintablePrescription
  from "@/components/invoice/PrintablePrescription";

interface Props {
  params: Promise<{
    prescriptionId: string;
  }>;
}

function PreviewPanel({
  title,
  subtitle,
  fileName,
  children,
}: {
  title: string;
  subtitle: string;
  fileName: string;
  children: React.ReactNode;
}) {
  const printRef =
    useRef<HTMLDivElement>(null);

  const handlePrint =
    useReactToPrint({
      contentRef: printRef,
    });

  const downloadPDF =
    async () => {
      try {
        const element =
          printRef.current;

        if (!element) {
          throw new Error("Preview is not ready yet.");
        }

        const canvas =
          await html2canvas(element);

        if (!canvas.width || !canvas.height) {
          throw new Error("Unable to render the preview for PDF download.");
        }

        const data =
          canvas.toDataURL("image/png");

        const pdf =
          new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
          });

        const imgWidth = 595;
        const imgHeight =
          (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(
          data,
          "PNG",
          0,
          0,
          imgWidth,
          imgHeight
        );

        pdf.save(fileName);
      } catch (error) {
        console.error("Failed to generate preview PDF:", error);

        const message =
          error instanceof Error
            ? error.message
            : "Failed to generate preview PDF.";

        window.alert(message);
      }
    };

  return (
    <section className="card-modern flex h-full flex-col gap-4">
      <div>
        <h2 className="card-title mb-2">{title}</h2>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="overflow-auto rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
        <div ref={printRef} className="inline-block">
          {children}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrint}
          className="btn-cyan"
        >
          Print
        </button>

        <button
          type="button"
          onClick={downloadPDF}
          className="btn-indigo-gradient"
        >
          Download PDF
        </button>
      </div>
    </section>
  );
}

export default function InvoicePreviewPage({
  params,
}: Props) {
  const router =
    useRouter();

  const resolvedParams =
    use(params);

  const searchParams =
    useSearchParams();

  const [prescription, setPrescription] =
    useState<any>(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      const response =
        await api.get(
          `/prescriptions/${resolvedParams.prescriptionId}`
        );

      setPrescription(response.data);
    };

    fetchPrescription();
  }, [resolvedParams.prescriptionId]);

  const doctorFee =
    Number(searchParams.get("doctorFee") ?? 500);

  const discount =
    Number(searchParams.get("discount") ?? 0);

  const patientDenied =
    searchParams.get("patientDenied") === "1";

  if (!prescription) {
    return (
      <div className="opd-loading-container">
        <div className="spinner" />
        <p className="opd-loading-text">Loading preview...</p>
      </div>
    );
  }

  const drugTotal =
    prescription.items.reduce(
      (sum: number, item: any) =>
        sum + (item.price * item.quantity),
      0
    );

  const finalTotal =
    drugTotal + doctorFee - discount;

  const handleFinishVisit =
    async () => {
      try {
        const response = await api.post("/invoices", {
          consultation_id: prescription.consultation_id,
          prescription_id: prescription.prescription_id,
          total_drug_cost: drugTotal,
          doctor_fee: doctorFee,
          discount,
          total_amount: finalTotal,
          is_patient_denied: patientDenied,
        });

        const invoiceId = response.data.invoice_id;

        await api.post(`/invoices/${invoiceId}/finalize`);

        window.alert("Visit successful.");

        router.push("/doctor/patients");
      } catch (error: any) {
        console.error(error);
        alert(error.response?.data?.message || "Failed to finish visit");
      }
    };

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
              onClick={() => router.back()}
              className="opd-back-btn"
              title="Go back"
            >
              ←
            </button>
            <div>
              <h1 className="opd-header-title">Print Preview</h1>
              <p className="opd-header-subtitle">
                Prescription and invoice side by side
              </p>
            </div>
          </div>

          <div className="opd-header-right">
            <div className="opd-header-badge">
              <span className="opd-header-badge-dot" />
              {prescription?.prescription_id || "Preview"}
            </div>
          </div>
        </div>
      </header>

      <main className="opd-main">
        <div className="mx-auto flex max-w-[1700px] flex-col gap-6">
          <div className="card-modern">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="card-title mb-2">Print Preview</h2>
                <p className="text-sm text-slate-400">
                  Review the prescription and invoice layouts before printing or downloading.
                </p>
              </div>

              <div className="text-sm text-slate-400 lg:text-right">
                <p>Doctor fee: Rs. {doctorFee}</p>
                <p>Discount: Rs. {discount}</p>
                <p>
                  Visit status: {patientDenied ? "Patient denied" : "Proceeding"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <PreviewPanel
              title="Prescription View"
              subtitle="Medication order, dosage, and instructions"
              fileName={`prescription-${resolvedParams.prescriptionId}.pdf`}
            >
              <PrintablePrescription prescription={prescription} />
            </PreviewPanel>

            <PreviewPanel
              title="Invoice View"
              subtitle="Billing summary and payment totals"
              fileName={`invoice-${resolvedParams.prescriptionId}.pdf`}
            >
              <PrintableInvoice
                invoice={{
                  consultation: prescription.consultation,
                  prescription,
                  total_drug_cost: drugTotal,
                  doctor_fee: doctorFee,
                  discount,
                  total_amount: finalTotal,
                }}
              />
            </PreviewPanel>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleFinishVisit}
              className="opd-submit-btn"
            >
              Finish Visit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}