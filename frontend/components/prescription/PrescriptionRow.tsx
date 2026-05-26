"use client";

import { useEffect } from "react";

import StockAlert from "./StockAlert";
import DrugSearchInput from "./DrugSearchInput";

interface Props {
  item: any;

  updateItem: any;
}

export default function PrescriptionRow({
  item,
  updateItem,
}: Props) {

  const selectDrug = async (drug: any) => {
    // Drug from DrugSearchInput already includes availability and status
    updateItem({
      drug_id: drug.drug_id,
      drug_name: drug.name,
      price: drug.selling_price,
      available_quantity: drug.available_quantity,
      stock_status: drug.stock_status,
    });
  };

  useEffect(() => {

    if (
      item.frequency &&
      item.duration
    ) {

      const freq =
        Number(
          item.frequency.split(" ")[0]
        );

      const duration =
        Number(
          item.duration.split(" ")[0]
        );

      updateItem({
        quantity: freq * duration,
      });
    }

  }, [
    item.frequency,
    item.duration,
  ]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-slate-100 shadow-lg shadow-slate-950/20">

      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          Drug Line
        </p>

        <p className="text-xs text-slate-500">
          Auto-calculates quantity from frequency and duration.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">

        <div>

          <DrugSearchInput
            value={item.drug_name}
            onChange={(val) => updateItem({ drug_name: val })}
            onSelect={selectDrug}
          />

        </div>

        <select
          className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white"

          onChange={(e) =>
            updateItem({
              dosage: e.target.value,
            })
          }
        >
          <option>
            Select Dosage
          </option>

          <option>
            1 Tablet
          </option>

          <option>
            2 Tablets
          </option>

        </select>

        <select
          className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white"

          onChange={(e) =>
            updateItem({
              frequency: e.target.value,
            })
          }
        >
          <option>
            Frequency
          </option>

          <option>
            1 Time / Day
          </option>

          <option>
            2 Times / Day
          </option>

          <option>
            3 Times / Day
          </option>

        </select>

        <select
          className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white"

          onChange={(e) =>
            updateItem({
              duration: e.target.value,
            })
          }
        >
          <option>
            Duration
          </option>

          <option>
            3 Days
          </option>

          <option>
            5 Days
          </option>

        </select>

      </div>

      <div className="mt-4 flex items-end justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">

        <div>

          <p className="text-sm text-slate-300">
            Quantity:
            {" "}
            {item.quantity}
          </p>

          <p className="text-sm text-slate-300">
            Price:
            {" "}
            Rs.{item.price}
          </p>

        </div>

        <StockAlert
          status={item.stock_status}

          quantity={
            item.available_quantity
          }
        />

      </div>

    </div>
  );
}