"use client";

import api from "@/lib/axios";

interface Props {
  items: any[];

  consultationId: number;
}

export default function PrescriptionSummary({
  items,
  consultationId,
}: Props) {

  const total =
    items.reduce(
      (sum, item) =>
        sum +
        (item.price * item.quantity),
      0
    );

  const savePrescription =
    async () => {

    try {

      await api.post(
        "/prescriptions",
        {
          consultation_id:
            consultationId,

          total_amount: total,

          items,
        }
      );

      alert(
        "Prescription saved"
      );

    } catch (error: any) {

      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 mt-6">

      <div className="flex justify-between items-center">

        <h2 className="font-semibold">
          Total:
        </h2>

        <h2 className="text-2xl font-bold">
          Rs.{total}
        </h2>

      </div>

      <div className="flex justify-end mt-4">

        <button
          onClick={savePrescription}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Proceed to Invoice
        </button>

      </div>

    </div>
  );
}