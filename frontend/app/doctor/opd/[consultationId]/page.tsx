"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/axios";

import { Consultation }
  from "@/types/consultation";

import PatientHeader
  from "@/components/opd/PatientHeader";

import ChiefComplaintCard
  from "@/components/opd/ChiefComplaintCard";

import SymptomsCard
  from "@/components/opd/SymptomsCard";

import ExaminationCard
  from "@/components/opd/ExaminationCard";

import InvestigationCard
  from "@/components/opd/InvestigationCard";

import InstructionCard
  from "@/components/opd/InstructionCard";

import DiagnosisCard
  from "@/components/opd/DiagnosisCard";

import DoctorNotesCard
  from "@/components/opd/DoctorNotesCard";

interface Props {
  params: Promise<{
    consultationId: string;
  }>;
}

export default function OPDPage({
  params,
}: Props) {
  const router = useRouter();
  const resolvedParams = use(params);

  const [consultation, setConsultation] =
    useState<Consultation | null>(null);
  const [chiefComplaint, setChiefComplaint] = useState<string>("");
  const [doctorNotes, setDoctorNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchConsultation =
    async () => {

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoadError("Please sign in to view this consultation.");
        router.replace("/auth/login");
        return;
      }

      const response =
        await api.get(
          `/consultations/${resolvedParams.consultationId}`
        );

      setConsultation(response.data);
      setChiefComplaint(response.data.chief_complaint || "");
      setDoctorNotes(response.data.notes || "");

    } catch (error) {
      console.error(error);
      setLoadError("Unable to load consultation.");

      const status = (error as any)?.response?.status;

      if (status === 401) {
        router.replace("/auth/login");
      }
    }
  };

  const handleDataAdded = () => {
    // Section cards manage their own local lists so saves stay scoped to that section.
  };

  useEffect(() => {
    fetchConsultation();
  }, [resolvedParams.consultationId]);

  if (!consultation) {
    if (loadError) {
      return (
        <div className="opd-loading-container">
          <p className="opd-loading-text">{loadError}</p>
        </div>
      );
    }

    return (
      <div className="opd-loading-container">
        <div className="spinner"></div>
        <p className="opd-loading-text">Loading consultation...</p>
      </div>
    );
  }

  return (
    <div className="opd-page">
      <header className="opd-header">
        <div className="opd-header-content">
          <div className="opd-header-left">
            <span className="opd-header-icon">🏥</span>
            <div>
              <h1 className="opd-header-title">OPD Consultation</h1>
              <p className="opd-header-subtitle">Patient Clinical Assessment</p>
            </div>
          </div>
        </div>
      </header>

      <main className="opd-main">
        <PatientHeader patient={consultation.patient} />

        <div className="opd-grid">

          <div className="opd-grid-item col-span-3">
            <ChiefComplaintCard
                consultation={consultation}
                value={chiefComplaint}
                onChange={setChiefComplaint}
            />
          </div>

          <div className="opd-grid-item col-span-5">
            <SymptomsCard
              consultationId={
                consultation.consultation_id
              }
              symptoms={consultation.symptoms}
              onDataAdded={handleDataAdded}
            />
          </div>

          <div className="opd-grid-item col-span-4">
            <ExaminationCard
              consultationId={
                consultation.consultation_id
              }
              examinations={
                consultation.examinations
              }
              onDataAdded={handleDataAdded}
            />
          </div>

          <div className="opd-grid-item col-span-5">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <InvestigationCard
              consultationId={consultation.consultation_id}
              investigations={consultation.investigations}
              onDataAdded={handleDataAdded}
            />

            <InstructionCard
              consultationId={
                consultation.consultation_id
              }
              instructions={
                consultation.instructions
              }
              onDataAdded={handleDataAdded}
            />
          </div>

          <div className="opd-grid-item col-span-3">
            <DiagnosisCard
              consultationId={
                consultation.consultation_id
              }
              diagnoses={
                consultation.diagnoses
              }
              onDataAdded={handleDataAdded}
            />
          </div>

          <div className="opd-grid-item col-span-4">
            <DoctorNotesCard
              consultation={consultation}
              value={doctorNotes}
              onChange={setDoctorNotes}
            />
          </div>

        </div>
        <div className="opd-submit-container">
          <button
            className="btn-indigo-gradient w-40 ml-auto"
            disabled={isSubmitting}
            onClick={async () => {
              if (!consultation) return;
              setIsSubmitting(true);
              try {
                await api.put(
                  `/consultations/${consultation.consultation_id}`,
                  {
                    chief_complaint: chiefComplaint,
                    notes: doctorNotes,
                  }
                );
                await fetchConsultation();
                alert("Consultation submitted");
              } catch (error) {
                console.error(error);
                alert("Failed to submit consultation");
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </main>
    </div>
  );
}