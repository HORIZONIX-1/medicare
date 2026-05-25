"use client";

import { PrescriptionItem }
  from "@/types/prescription";

import PrescriptionRow
  from "./PrescriptionRow";

interface Props {
  items: PrescriptionItem[];

  setItems: any;
}

export default function PrescriptionTable({
  items,
  setItems,
}: Props) {

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

  const updateItem =
    (index: number, data: any) => {

    const updated = [...items];

    updated[index] = {
      ...updated[index],
      ...data,
    };

    setItems(updated);
  };

  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 text-slate-100 shadow-xl shadow-slate-950/30 backdrop-blur-xl">

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Prescription Builder
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Prescription Drugs
          </h2>
        </div>

        <button
          onClick={addRow}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-cyan-400"
        >
          Add Drug
        </button>

      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 px-5 py-10 text-center text-slate-300">
          <p className="text-base font-semibold text-white">
            No prescription items yet.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Click Add Drug to start building the prescription.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {items.map((item, index) => (

            <PrescriptionRow
              key={index}

              item={item}

              updateItem={(data: any) =>
                updateItem(index, data)
              }
            />

          ))}

        </div>
      )}

    </div>
  );
}