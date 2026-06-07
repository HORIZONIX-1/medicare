"use client";

import Link from "next/link";

export default function RegisterPatient() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-4 items-start">
      <section className="card card-dark p-6">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">Patient Registration</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Name *" placeholder="Enter full name" />
          <Field label="Phone *" placeholder="Enter phone number" />
          <Field label="NIC (Optional)" placeholder="Enter NIC" />
          <Field
            label="Date of Birth"
            placeholder="dd/mm/yyyy"
            type="date"
            inputClassName="pr-3"
          />
        </div>

        <div className="my-6 border-t border-white/10" />

        <div className="mb-4">
          <h2 className="text-base font-semibold">Guardian Details (Optional)</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Guardian Name" placeholder="Enter guardian name" />
          <SelectField label="Relationship" placeholder="Select relationship" />
          <Field label="Guardian Phone" placeholder="Enter guardian phone" />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm muted">* Required fields</p>
          <button className="btn btn-cyan min-w-40">Save &amp; Continue</button>
        </div>
      </section>

      <aside className="card card-dark p-4 h-full">
        <div className="border border-white/10 rounded-sm p-4 h-full flex flex-col">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold">Possible Duplicate Found</h2>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center flex-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 9v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M12 17h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M10.3 4.5 2.6 18a1.6 1.6 0 0 0 1.4 2.4h16a1.6 1.6 0 0 0 1.4-2.4l-7.7-13.5a1.6 1.6 0 0 0-2.8 0Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm muted leading-6">A patient with similar information already exists.</p>
          </div>

          <div className="border border-white/10 rounded-sm p-3 mb-4 text-sm">
            <InfoRow label="Name" value="Saman Perera" />
            <InfoRow label="Patient ID" value="P10045" />
            <InfoRow label="Phone" value="077 123 4567" />
            <InfoRow label="NIC" value="123456789V" />
          </div>

          <div className="grid gap-3 mt-1">
            <Link href="/receptionist/patients" className="btn btn-ghost w-full">
              View Existing
            </Link>
            <button className="btn w-full">Continue Anyway</button>
          </div>

          <p className="text-sm muted mt-auto pt-4 leading-6">
            Please confirm if you want to continue with new registration.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  inputClassName = "",
}: {
  label: string;
  placeholder: string;
  type?: string;
  inputClassName?: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-semibold text-slate-100">{label}</span>
      <input type={type} placeholder={placeholder} className={`input input-bordered w-full ${inputClassName}`} />
    </label>
  );
}

function SelectField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-semibold text-slate-100">{label}</span>
      <select className="input input-bordered w-full">
        <option value="">{placeholder}</option>
        <option value="parent">Parent</option>
        <option value="guardian">Guardian</option>
        <option value="spouse">Spouse</option>
        <option value="other">Other</option>
      </select>
    </label>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 py-1">
      <div className="text-slate-300">{label}</div>
      <div className="text-slate-100 font-medium">: {value}</div>
    </div>
  );
}
