"use client";

import { Plus } from "lucide-react";
import { PrescriptionItem } from "@/types/prescription";
import PrescriptionRow from "./PrescriptionRow";

interface Props {
  items: PrescriptionItem[];
  setItems: any;
}

export default function PrescriptionTable({ items, setItems }: Props) {
  const addRow = () => {
    setItems([
      ...items,
      {
        drug_name: "",
        quantity: 1,
        price: 0,
        is_outside_drug: false,
      },
    ]);
  };

  const updateItem = (index: number, data: any) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      ...data,
    };
    setItems(updated);
  };

  return (
    <div className="bg-white border border-[#d5d9e0] rounded p-5 text-[#111827]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
            Prescription Builder
          </p>
          <h2 className="mt-1 text-base font-extrabold text-[#111827]">
            Prescription Drugs
          </h2>
        </div>

        <button
          onClick={addRow}
          className="inline-flex items-center justify-center gap-1.5 rounded border border-[#111827] bg-[#111827] px-4 py-2 text-xs font-extrabold text-white transition hover:bg-[#1f2937]"
        >
          <Plus size={14} />
          <span>Add Drug</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded border border-dashed border-[#cbd1da] bg-[#f8fafc] px-5 py-8 text-center">
          <p className="text-sm font-bold text-[#111827]">
            No prescription items added yet.
          </p>
          <p className="mt-1 text-xs font-semibold text-[#64748b]">
            Click "Add Drug" to start building the prescription.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <PrescriptionRow
              key={index}
              item={item}
              updateItem={(data: any) => updateItem(index, data)}
            />
          ))}
        </div>
      )}
    </div>
  );
}