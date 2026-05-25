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
    <div className="bg-white border rounded-lg p-4">

      <div className="flex justify-between mb-4">

        <h2 className="font-semibold">
          Prescription Drugs
        </h2>

        <button
          onClick={addRow}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Drug
        </button>

      </div>

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

    </div>
  );
}