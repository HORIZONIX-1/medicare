interface Props {
  items: any[];
}

export default function InvoiceDrugTable({
  items,
}: Props) {

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-slate-100 shadow-xl shadow-black/20">

      <h2 className="mb-4 text-lg font-semibold text-slate-50">
        Prescription Medicines
      </h2>

      <table className="w-full border-collapse overflow-hidden rounded-xl border border-slate-800 text-sm">

        <thead className="bg-slate-800/80 text-slate-200">

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
              className="bg-slate-950/40 even:bg-slate-900"
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
  );
}