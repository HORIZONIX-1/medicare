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
    <div className="border rounded-lg p-4">

      <div className="grid grid-cols-4 gap-4">

        <div>

          <input
            value={item.drug_name}
            placeholder="Search Drug"
            className="border p-2 rounded w-full"

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

            <div className="border rounded mt-1 bg-white">

              {searchResults.map((drug) => (

                <div
                  key={drug.drug_id}

                  onClick={() =>
                    selectDrug(drug)
                  }

                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {drug.name}
                </div>

              ))}

            </div>
          )}

        </div>

        <select
          className="border p-2 rounded"

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
          className="border p-2 rounded"

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
          className="border p-2 rounded"

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

      <div className="flex justify-between mt-4">

        <div>

          <p>
            Quantity:
            {" "}
            {item.quantity}
          </p>

          <p>
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