"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface Props {
  onAdd: (drug: { drug_name: string; instructions: string; quantity: string }) => void;
}

export default function OutsideDrugForm({ onAdd }: Props) {
  const [outsideDrug, setOutsideDrug] = useState({
    drug_name: "",
    instructions: "",
    quantity: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outsideDrug.drug_name.trim()) return;
    onAdd({
      drug_name: outsideDrug.drug_name.trim(),
      instructions: outsideDrug.instructions.trim(),
      quantity: outsideDrug.quantity.trim(),
    });
    setOutsideDrug({ drug_name: "", instructions: "", quantity: "" });
  };

  return (
    <div className="bg-white border border-[#d5d9e0] rounded p-6 mb-8 text-[#111827]">
      <h3 className="text-sm font-extrabold text-[#111827]">Outside Drug (Not in System)</h3>
      <p className="text-xs font-medium text-[#64748b] mt-0.5 mb-4">Add medication that is not stocked in the clinic pharmacy.</p>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#374151] mb-1.5">Drug Name</label>
          <input
            value={outsideDrug.drug_name}
            onChange={(e) => setOutsideDrug((current) => ({ ...current, drug_name: e.target.value }))}
            placeholder="Enter drug name"
            className="w-full h-9 rounded border border-[#cbd1da] bg-white px-3 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#374151] mb-1.5">Instructions</label>
          <input
            value={outsideDrug.instructions}
            onChange={(e) => setOutsideDrug((current) => ({ ...current, instructions: e.target.value }))}
            placeholder="Enter instructions"
            className="w-full h-9 rounded border border-[#cbd1da] bg-white px-3 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#374151] mb-1.5">Quantity</label>
          <input
            value={outsideDrug.quantity}
            onChange={(e) => setOutsideDrug((current) => ({ ...current, quantity: e.target.value }))}
            placeholder="Enter quantity"
            className="w-full h-9 rounded border border-[#cbd1da] bg-white px-3 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full h-9 inline-flex items-center justify-center gap-1.5 px-4 text-xs font-extrabold text-white bg-[#111827] border border-[#111827] rounded transition-colors hover:bg-[#1f2937]"
          >
            <Plus size={14} />
            <span>Add Outside Drug</span>
          </button>
        </div>
      </form>
    </div>
  );
}
