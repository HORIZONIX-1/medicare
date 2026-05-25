"use client";

import { useEffect, useState }
  from "react";

import api from "@/lib/axios";

import StockAlert from "./StockAlert";

interface Props {
  item: any;

  updateItem: any;
}

export default function PrescriptionRow({
  item,
  updateItem,
}: Props) {

  const [searchResults, setSearchResults] =
    useState<any[]>([]);

  const searchDrugs =
    async (query: string) => {

    if (!query) return;

    const response =
      await api.get(
        `/drugs/search?query=${query}`
      );

    setSearchResults(response.data);
  };

  const selectDrug =
    async (drug: any) => {

    const stock =
      await api.get(
        `/drugs/${drug.drug_id}/availability`
      );

    updateItem({

      drug_id: drug.drug_id,

      drug_name: drug.name,

      price: drug.selling_price,

      available_quantity:
        stock.data.available_quantity,

      stock_status:
        stock.data.status,
    });

    setSearchResults([]);
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

          <input
            value={item.drug_name}
            placeholder="Search Drug"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder-slate-500"

            onChange={(e) => {

              updateItem({
                drug_name: e.target.value,
              });

              searchDrugs(
                e.target.value
              );
            }}
          />

          {searchResults.length > 0 && (

            <div className="mt-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl shadow-slate-950/40">

              {searchResults.map((drug) => (

                <div
                  key={drug.drug_id}

                  onClick={() =>
                    selectDrug(drug)
                  }

                  className="cursor-pointer px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800"
                >
                  {drug.name}
                </div>

              ))}

            </div>
          )}

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