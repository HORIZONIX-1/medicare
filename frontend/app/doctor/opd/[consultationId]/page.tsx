"use client";

import { useEffect, useRef, useState, use } from "react";
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

import ExaminationCard, {
  type ExaminationCardHandle,
} from "@/components/opd/ExaminationCard";

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
  const chiefComplaintDirtyRef = useRef(false);
  const doctorNotesDirtyRef = useRef(false);
  const examinationCardRef = useRef<ExaminationCardHandle | null>(null);

  const [consultation, setConsultation] =
    useState<Consultation | null>(null);
  const [chiefComplaint, setChiefComplaint] = useState<string>("");
  const [doctorNotes, setDoctorNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchConsultation =
    async (): Promise<Consultation | null> => {

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoadError("Please sign in to view this consultation.");
        router.replace("/auth/login");
        return null;
      }

      const response =
        await api.get(
          `/consultations/${resolvedParams.consultationId}`
        );

      const nextConsultation = {
        ...response.data,
        symptoms:
          response.data.symptoms ?? response.data.consultationSymptoms ?? [],
        examinations: response.data.examinations ?? [],
      };

      setConsultation(nextConsultation);

      if (!chiefComplaintDirtyRef.current) {
        setChiefComplaint(nextConsultation.chief_complaint || "");
      }

      if (!doctorNotesDirtyRef.current) {
        setDoctorNotes(nextConsultation.notes || "");
      }

      return nextConsultation;

    } catch (error) {
      console.error(error);
      setLoadError("Unable to load consultation.");

      const status = (error as any)?.response?.status;

      if (status === 401) {
        router.replace("/auth/login");
      }

      return null;
    }
  };

  const handleDataAdded = async () => {
    // After a section saves data on the server, re-fetch the consultation
    // but keep the user on the OPD page until they submit explicitly.
    try {
      await fetchConsultation();
    } catch (err) {
      console.error("handleDataAdded navigation check failed", err);
    }
  };

  useEffect(() => {
    chiefComplaintDirtyRef.current = false;
    doctorNotesDirtyRef.current = false;
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
                onChange={(nextValue) => {
                  chiefComplaintDirtyRef.current = true;
                  setChiefComplaint(nextValue);
                }}
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
              ref={examinationCardRef}
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
              onChange={(nextValue) => {
                doctorNotesDirtyRef.current = true;
                setDoctorNotes(nextValue);
              }}
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
                await examinationCardRef.current?.saveMetrics();

                await api.put(
                  `/consultations/${consultation.consultation_id}`,
                  {
                    chief_complaint: chiefComplaint,
                    notes: doctorNotes,
                  }
                );
                chiefComplaintDirtyRef.current = false;
                doctorNotesDirtyRef.current = false;
                router.push(`/doctor/prescription/${consultation.consultation_id}`);
              } catch (error) {
                console.error(error);
                alert("Failed to proceed to prescription");
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {isSubmitting ? "Saving..." : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
}