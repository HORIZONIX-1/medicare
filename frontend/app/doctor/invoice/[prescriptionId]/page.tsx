"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/axios";
import InvoiceSummary from "@/components/invoice/InvoiceSummary";
import InvoiceDrugTable from "@/components/invoice/InvoiceDrugTable";
import InvoiceActions from "@/components/invoice/InvoiceActions";

import {
  ArrowLeft,
} from "lucide-react";

interface Props {
  params: Promise<{
    prescriptionId: string;
  }>;
}

export default function InvoicePage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);

  const [prescription, setPrescription] = useState<any>(null);
  const [doctorFee, setDoctorFee] = useState(500);
  const [discount, setDiscount] = useState(0);
  const [patientDenied, setPatientDenied] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        setCurrentUser(JSON.parse(userString));
      }
      
      const savedFee = localStorage.getItem("doctorFee");
      const savedDiscount = localStorage.getItem("discount");
      if (savedFee) {
        setDoctorFee(Number(savedFee));
      }
      if (savedDiscount) {
        setDiscount(Number(savedDiscount));
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


  if (!prescription) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
        <p className="text-slate-500 text-sm mt-4">Loading invoice...</p>
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
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div className="white-card" style={{ padding: "2rem", marginBottom: 0 }}>
          <h2 className="white-card-title">Invoice & Finalize</h2>
          <p className="white-card-subtitle" style={{ marginBottom: 0 }}>
            Review medication costs, doctor fees, discounts, and preview printable invoices.
          </p>
        </div>

        <div className="white-card" style={{ marginBottom: 0 }}>
          <InvoiceDrugTable items={prescription.items} />
        </div>

        <div className="white-card" style={{ marginBottom: 0 }}>
          <InvoiceSummary
            drugTotal={drugTotal}
            doctorFee={doctorFee}
            setDoctorFee={setDoctorFee}
            discount={discount}
            setDiscount={setDiscount}
            patientDenied={patientDenied}
            setPatientDenied={setPatientDenied}
            finalTotal={finalTotal}
          />
        </div>

        <div className="white-card" style={{ marginBottom: 0 }}>
          <InvoiceActions
            onPreview={() => {
              const previewUrl = `/doctor/invoice/${resolvedParams.prescriptionId}/preview?doctorFee=${doctorFee}&discount=${discount}&patientDenied=${patientDenied ? 1 : 0}`;
              router.push(previewUrl);
            }}
          />
        </div>
      </div>

      {/* Bottom Actions Back */}
      <div className="max-w-[1000px] mx-auto flex justify-between items-center" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn-light-outline"
          style={{ padding: "0.75rem 1.75rem", borderRadius: "0.5rem" }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

    </>
  );
}