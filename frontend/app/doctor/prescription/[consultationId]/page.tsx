"use client";

import { useState, use } from "react";

import PrescriptionTable
  from "@/components/prescription/PrescriptionTable";

import PrescriptionSummary
  from "@/components/prescription/PrescriptionSummary";

import { PrescriptionItem }
  from "@/types/prescription";

interface Props {
  params: Promise<{
    consultationId: string;
  }>;
}

export default function PrescriptionPage({
  params,
}: Props) {

  const resolvedParams = use(params);

  const [items, setItems] =
    useState<PrescriptionItem[]>([]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Prescription Page
      </h1>

      <PrescriptionTable
        items={items}
        setItems={setItems}
      />

      <PrescriptionSummary
        items={items}
        consultationId={
          Number(resolvedParams.consultationId)
        }
      />

    </div>
  );
}