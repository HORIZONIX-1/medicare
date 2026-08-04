interface Props {
  items: any[];
}

export default function InvoiceDrugTable({
  items,
}: Props) {

  return (
    <div className="text-slate-100">

      <h2 className="mb-4 text-lg font-semibold text-slate-50">
        Prescription Medicines
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full border-collapse text-sm">

        <thead className="bg-slate-900/80 text-slate-200">

          <tr>
            <th className="border border-slate-700 p-3 text-left">
              Drug
            </th>

            <th className="border border-slate-700 p-3 text-left">
              Qty
            </th>

            <th className="border border-slate-700 p-3 text-left">
              Price
            </th>

            <th className="border border-slate-700 p-3 text-left">
              Total
            </th>
          </tr>

        </thead>

        <tbody>

          {items.map((item) => (

            <tr
              key={
                item.prescription_item_id
              }
              className="bg-slate-950/30 even:bg-slate-900/60 hover:bg-slate-900/80 transition-colors"
            >

              <td className="border border-slate-800 p-3 text-slate-100">
                {item.drug_name}
              </td>

              <td className="border border-slate-800 p-3 text-slate-200">
                {item.quantity}
              </td>

              <td className="border border-slate-800 p-3 text-slate-200">
                Rs.{item.price}
              </td>

              <td className="border border-slate-800 p-3 text-slate-200">
                Rs.
                {item.price * item.quantity}
              </td>

            </tr>
          ))}

        </tbody>

      </table>
      </div>

    </div>
  );
}