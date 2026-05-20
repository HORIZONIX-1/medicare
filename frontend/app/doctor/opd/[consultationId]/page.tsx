"use client";

import { useEffect, useState, use } from "react";

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
  const resolvedParams = use(params);

  const [consultation, setConsultation] =
    useState<Consultation | null>(null);

  const fetchConsultation =
    async () => {

    try {

      const response =
        await api.get(
          `/consultations/${resolvedParams.consultationId}`
        );

      setConsultation(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDataAdded = () => {
    fetchConsultation();
  };

  useEffect(() => {
    fetchConsultation();
  }, [resolvedParams.consultationId]);

  if (!consultation) {
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
              onUpdate={handleDataAdded}
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
              onUpdate={handleDataAdded}
            />
          </div>

        </div>
      </main>
    </div>
  );
}