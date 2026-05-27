interface Props {

  drugTotal: number;

  doctorFee: number;
  setDoctorFee: any;

  discount: number;
  setDiscount: any;

  patientDenied: boolean;
  setPatientDenied: any;

  finalTotal: number;
}

export default function InvoiceSummary({
  drugTotal,

  doctorFee,
  setDoctorFee,

  discount,
  setDiscount,

  patientDenied,
  setPatientDenied,

  finalTotal,
}: Props) {

  return (
    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 text-slate-100 shadow-xl shadow-black/20">

      <h2 className="mb-4 text-lg font-semibold text-slate-50">
        Invoice Summary
      </h2>

      <div className="space-y-4">

        <div className="flex items-center justify-between gap-4">

          <span className="text-slate-300">Drug Total</span>

          <span className="font-medium text-slate-100">
            Rs.{drugTotal}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-slate-300">Doctor Fee</span>

          <input
            type="number"

            value={doctorFee}

            onChange={(e) =>
              setDoctorFee(
                Number(e.target.value)
              )
            }

            className="w-32 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none placeholder-slate-500 focus:border-sky-500"
          />

        </div>

        <div className="flex justify-between items-center">

          <span className="text-slate-300">Discount</span>

          <input
            type="number"

            value={discount}

            onChange={(e) =>
              setDiscount(
                Number(e.target.value)
              )
            }

            className="w-32 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none placeholder-slate-500 focus:border-sky-500"
          />

        </div>

        <div className="flex justify-between items-center">

          <span className="text-slate-300">
            Patient Did Not Buy Medicines
          </span>

          <input
            type="checkbox"

            checked={patientDenied}

            onChange={(e) =>
              setPatientDenied(
                e.target.checked
              )
            }
            className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-sky-500"
          />

        </div>

        <hr className="border-slate-800" />

        <div className="flex justify-between text-xl font-bold text-slate-50">

          <span>Final Total</span>

          <span className="text-slate-100">
            Rs.{finalTotal}
          </span>

        </div>

      </div>

    </div>
  );
}