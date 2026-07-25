"use client";

import { useEffect } from "react";
import StockAlert from "./StockAlert";
import DrugSearchInput from "./DrugSearchInput";

interface Props {
  item: any;
  updateItem: any;
}

export default function PrescriptionRow({ item, updateItem }: Props) {
  const selectDrug = async (drug: any) => {
    updateItem({
      drug_id: drug.drug_id,
      drug_name: drug.name,
      price: drug.selling_price,
      available_quantity: drug.available_quantity,
      stock_status: drug.stock_status,
    });
  };

  useEffect(() => {
    if (item.frequency && item.duration) {
      const freq = Number(item.frequency.split(" ")[0]);
      const duration = Number(item.duration.split(" ")[0]);
      if (Number.isFinite(freq) && Number.isFinite(duration)) {
        updateItem({
          quantity: freq * duration,
        });
      }
    }
  }, [item.frequency, item.duration]);

  return (
    <div className="rounded border border-[#d5d9e0] bg-[#f8fafc] p-4 text-[#111827]">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
          Drug Line Item
        </p>

        <p className="text-xs font-semibold text-[#64748b]">
          Auto-calculates quantity from frequency & duration.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        <div>
          <DrugSearchInput
            value={item.drug_name}
            onChange={(val) => updateItem({ drug_name: val })}
            onSelect={selectDrug}
          />
        </div>

        <select
          value={item.dosage || "Select Dosage"}
          className="h-9 rounded border border-[#cbd1da] bg-white px-3 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
          onChange={(e) =>
            updateItem({
              dosage: e.target.value,
            })
          }
        >
          <option value="Select Dosage" disabled>
            Select Dosage
          </option>
          <option value="1 Tablet">1 Tablet</option>
          <option value="2 Tablets">2 Tablets</option>
          <option value="Apply to affected area">Apply to affected area</option>
        </select>

        <select
          value={item.frequency || "Frequency"}
          className="h-9 rounded border border-[#cbd1da] bg-white px-3 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
          onChange={(e) =>
            updateItem({
              frequency: e.target.value,
            })
          }
        >
          <option value="Frequency" disabled>
            Frequency
          </option>
          <option value="1 Time / Day">1 Time / Day</option>
          <option value="2 Times / Day">2 Times / Day</option>
          <option value="3 Times / Day">3 Times / Day</option>
        </select>

        <select
          value={item.duration || "Duration"}
          className="h-9 rounded border border-[#cbd1da] bg-white px-3 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none"
          onChange={(e) =>
            updateItem({
              duration: e.target.value,
            })
          }
        >
          <option value="Duration" disabled>
            Duration
          </option>
          <option value="3 Days">3 Days</option>
          <option value="5 Days">5 Days</option>
          <option value="7 Days">7 Days</option>
        </select>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 rounded border border-[#e2e8f0] bg-white p-3">
        <div className="flex gap-6 text-xs font-bold text-[#111827]">
          <span>
            Quantity: <span className="font-extrabold text-[#2563eb]">{item.quantity || 1}</span>
          </span>
          <span>
            Price: <span className="font-extrabold text-[#111827]">Rs. {item.price || 0}</span>
          </span>
        </div>

        <StockAlert
          status={item.stock_status}
          quantity={item.available_quantity}
        />
      </div>
    </div>
  );
}