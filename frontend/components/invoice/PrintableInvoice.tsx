"use client";

import React from "react";

interface Props {
  invoice: any;
}

const PrintableInvoice =
  React.forwardRef<
    HTMLDivElement,
    Props
  >(({ invoice }, ref) => {

  return (
    <div
      ref={ref}
      className="bg-white p-10 text-black"
      style={{
        width: "800px",
      }}
    >

      {/* HEADER */}

      <div className="text-center mb-8">

        <h1 className="text-3xl font-bold">

          Medicare Medical Center

        </h1>

        <p>
          Negombo, Sri Lanka
        </p>

        <p>
          Tel: 0771234567
        </p>

      </div>

      <hr className="mb-6" />

      {/* PATIENT DETAILS */}

      <div className="mb-6">

        <h2 className="font-bold text-xl mb-3">
          Patient Details
        </h2>

        <p>
          Patient:
          {" "}
          {
            invoice.consultation
              .patient.name
          }
        </p>

        <p>
          Patient ID:
          {" "}
          {
            invoice.consultation
              .patient.patient_code
          }
        </p>

      </div>

      {/* DRUG TABLE */}

      <table className="w-full border mb-6">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-2">
              Drug
            </th>

            <th className="border p-2">
              Qty
            </th>

            <th className="border p-2">
              Price
            </th>

            <th className="border p-2">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {invoice.prescription.items.map(
            (item: any) => (

              <tr
                key={
                  item.prescription_item_id
                }
              >

                <td className="border p-2">
                  {item.drug_name}
                </td>

                <td className="border p-2">
                  {item.quantity}
                </td>

                <td className="border p-2">
                  Rs.{item.price}
                </td>

                <td className="border p-2">
                  Rs.
                  {
                    item.price *
                    item.quantity
                  }
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

      {/* SUMMARY */}

      <div className="flex justify-end">

        <div className="w-72 space-y-2">

          <div className="flex justify-between">

            <span>
              Drug Cost
            </span>

            <span>
              Rs.
              {
                invoice.total_drug_cost
              }
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Doctor Fee
            </span>

            <span>
              Rs.
              {
                invoice.doctor_fee
              }
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Discount
            </span>

            <span>
              Rs.
              {
                invoice.discount
              }
            </span>

          </div>

          <hr />

          <div className="flex justify-between font-bold text-xl">

            <span>
              Total
            </span>

            <span>
              Rs.
              {
                invoice.total_amount
              }
            </span>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="mt-12 text-center text-sm">

        <p>
          Thank you for visiting our clinic.
        </p>

        <p>
          Get well soon.
        </p>

      </div>

    </div>
  );
});

PrintableInvoice.displayName =
  "PrintableInvoice";

export default PrintableInvoice;