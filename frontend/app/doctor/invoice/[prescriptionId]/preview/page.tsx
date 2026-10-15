"use client";

import { use, useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "@/components/invoice/PrintableInvoice";
import PrintablePrescription from "@/components/invoice/PrintablePrescription";
import {
  ArrowLeft,
  Printer,
  Download,
  Check,
} from "lucide-react";

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
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const downloadPDF = async () => {
    try {
      const element = printRef.current;

      if (!element) {
        throw new Error("Preview is not ready yet.");
      }

      // Loaded on demand: these libraries are large and only needed for downloads
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(element);

      if (!canvas.width || !canvas.height) {
        throw new Error("Unable to render the preview for PDF download.");
      }

      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgWidth = 595;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);
    } catch (error) {
      console.error("Failed to generate preview PDF:", error);
      const message = error instanceof Error ? error.message : "Failed to generate preview PDF.";
      window.alert(message);
    }
  };

  return (
    <section className="white-card" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: 0 }}>
      <div>
        <h2 className="white-card-title" style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{title}</h2>
        <p style={{ fontSize: "0.8125rem", color: "#64748b" }}>{subtitle}</p>
      </div>

      <div style={{ overflow: "auto", borderRadius: "0.5rem", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", padding: "1.25rem", display: "flex", justifyContent: "center" }}>
        <div ref={printRef} className="inline-block" style={{ backgroundColor: "#ffffff", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          {children}
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
        <button
          type="button"
          onClick={handlePrint}
          className="btn-light-outline"
        >
          <Printer size={16} />
          <span>Print</span>
        </button>

        <button
          type="button"
          onClick={downloadPDF}
          className="btn-light-blue"
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button>
      </div>
    </section>
  );
}

export default function InvoicePreviewPage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const searchParams = useSearchParams();

  const [prescription, setPrescription] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        setCurrentUser(JSON.parse(userString));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);


  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await api.get(`/prescriptions/${resolvedParams.prescriptionId}`);
        setPrescription(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPrescription();
  }, [resolvedParams.prescriptionId]);

  const doctorFee = Number(searchParams.get("doctorFee") ?? 500);
  const discount = Number(searchParams.get("discount") ?? 0);
  const patientDenied = searchParams.get("patientDenied") === "1";

  if (!prescription) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
        <p className="text-slate-500 text-sm mt-4">Loading preview...</p>
      </div>
    );
  }

  const drugTotal = prescription.items.reduce(
    (sum: number, item: any) => sum + (item.price * item.quantity),
    0
  );

  // Medicines the patient declined to buy are not charged
  const billedDrugCost = patientDenied ? 0 : drugTotal;
  const finalTotal = Math.max(0, billedDrugCost + doctorFee - discount);

  const handleFinishVisit = async () => {
    try {
      const response = await api.post("/invoices", {
        consultation_id: prescription.consultation_id,
        prescription_id: prescription.prescription_id,
        total_drug_cost: billedDrugCost,
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
    <>

      <div className="dr-page-header">
        <h1 className="dr-page-title">Consultation</h1>
      </div>

      {/* Stepper Progress Bar */}
      <div className="consultation-stepper">
        {/* Steps */}
        <div className="stepper-step active">
          <div className="stepper-circle">1</div>
          <span className="stepper-label">Select Patient</span>
        </div>
        <div className="stepper-step active">
          <div className="stepper-circle">2</div>
          <span className="stepper-label">Chief Complaint</span>
        </div>
        <div className="stepper-step active">
          <div className="stepper-circle">3</div>
          <span className="stepper-label">Examination</span>
        </div>
        <div className="stepper-step active">
          <div className="stepper-circle">4</div>
          <span className="stepper-label">Diagnosis & Notes</span>
        </div>
        <div className="stepper-step active">
          <div className="stepper-circle">5</div>
          <span className="stepper-label">Prescription</span>
        </div>
        <div className="stepper-step active">
          <div className="stepper-circle">6</div>
          <span className="stepper-label">Review & Invoice</span>
        </div>

        {/* Connector lines behind */}
        <div className="stepper-connector">
          <div className="flex w-full h-full items-center justify-between" style={{ gap: "2px" }}>
            <div className="stepper-connector-line active flex-1" />
            <div className="stepper-connector-line active flex-1" />
            <div className="stepper-connector-line active flex-1" />
            <div className="stepper-connector-line active flex-1" />
            <div className="stepper-connector-line active flex-1" />
          </div>
        </div>
      </div>

      {/* Main Billing Contents */}
      <div style={{ maxWidth: "1600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div className="white-card" style={{ padding: "2rem", marginBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 className="white-card-title">Invoice Print Preview</h2>
              <p className="white-card-subtitle" style={{ marginBottom: 0 }}>
                Review the prescription and invoice printable layouts.
              </p>
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#64748b", display: "flex", gap: "1.5rem" }}>
              <span>Doctor Fee: <b>Rs. {doctorFee}</b></span>
              <span>Discount: <b>Rs. {discount}</b></span>
              <span>Status: <b>{patientDenied ? "Patient Denied Medicines" : "Proceeding"}</b></span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))", gap: "2rem" }}>
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
                total_drug_cost: billedDrugCost,
                doctor_fee: doctorFee,
                discount,
                total_amount: finalTotal,
              }}
            />
          </PreviewPanel>
        </div>
      </div>

      {/* Bottom Actions Back */}
      <div className="max-w-[1600px] mx-auto flex justify-between items-center" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-light-outline"
          style={{ padding: "0.75rem 1.75rem", borderRadius: "0.5rem" }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleFinishVisit}
          className="btn-light-blue"
          style={{ padding: "0.75rem 2.25rem", borderRadius: "0.5rem" }}
        >
          <Check size={16} />
          <span>Finish Visit</span>
        </button>
      </div>

    </>
  );
}