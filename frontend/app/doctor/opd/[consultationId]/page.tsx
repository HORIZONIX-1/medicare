"use client";

import { useEffect, useState } from "react";

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
  params: {
    consultationId: string;
  };
}

export default function OPDPage({
  params,
}: Props) {

  const [consultation, setConsultation] =
    useState<Consultation | null>(null);

  const fetchConsultation =
    async () => {

    try {

      const response =
        await api.get(
          `/consultations/${params.consultationId}`
        );

      setConsultation(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConsultation();
  }, []);

  if (!consultation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        OPD / Consultation
      </h1>

      <PatientHeader patient={consultation.patient} />

      <div className="grid grid-cols-12 gap-4 mt-4">

        <div className="col-span-3">
          <ChiefComplaintCard
            consultation={consultation}
          />
        </div>

        <div className="col-span-5">
          <SymptomsCard
            consultationId={
              consultation.consultation_id
            }
            symptoms={consultation.symptoms}
          />
        </div>

        <div className="col-span-4">
          <ExaminationCard
            consultationId={
              consultation.consultation_id
            }
            examinations={
              consultation.examinations
            }
          />
        </div>

        <div className="col-span-5">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <InvestigationCard
            consultationId={consultation.consultation_id}
            investigations={consultation.investigations}
          />

          <InstructionCard
            consultationId={
              consultation.consultation_id
            }
            instructions={
              consultation.instructions
            }
          />
        </div>

        <div className="col-span-3">
          <DiagnosisCard
            consultationId={
              consultation.consultation_id
            }
            diagnoses={
              consultation.diagnoses
            }
          />
        </div>

        <div className="col-span-4">
          <DoctorNotesCard
            consultation={consultation}
          />
        </div>

      </div>

    </div>
  );
}