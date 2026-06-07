"use client";

import Link from "next/link";
import { useState } from "react";
import api from "@/lib/axios";

type FormState = {
  name: string;
  phone: string;
  nic: string;
  date_of_birth: string;
  gender: string;
  guardian_name: string;
  relationship: string;
  guardian_phone: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  nic: "",
  date_of_birth: "",
  gender: "Female",
  guardian_name: "",
  relationship: "",
  guardian_phone: "",
};


export default function RegisterPatient() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [savedPatientCode, setSavedPatientCode] = useState<string | null>(null);

  const [duplicate, setDuplicate] = useState<any>(null);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setMessage(null);
  setSavedPatientCode(null);
  setDuplicate(null);

  try {
    // 1. CHECK DUPLICATES FIRST
    const check = await api.get("/patients/search", {
      params: {
        type: "nic",
        value: form.nic || form.phone,
      },
    });

    if (check.data?.length > 0) {
      setDuplicate(check.data[0]);
      setIsSubmitting(false);
      return; // STOP SAVE
    }

    // 2. IF NO DUPLICATE → SAVE PATIENT
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim() || undefined,
      nic: form.nic.trim() || undefined,
      date_of_birth: form.date_of_birth,
      gender: form.gender,
      address: undefined,
      guardian_name: form.guardian_name.trim(),
      guardian_phone: form.guardian_phone.trim(),
      relationship: form.relationship.trim(),
    };

    const response = await api.post("/patients", payload);

    setSavedPatientCode(response.data?.patient_code || null);
    setMessage({
      type: "success",
      text: `Patient saved successfully${response.data?.patient_code ? ` as ${response.data.patient_code}` : ""}.`,
    });

    setForm(initialState);
  } catch (error: any) {
    setMessage({
      type: "error",
      text: error.response?.data?.message || "Registration failed.",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-4 items-start">
      <section className="card card-dark p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Patient Registration</h1>
          {message?.type === "success" && savedPatientCode ? (
            <div className="text-sm muted">Saved as {savedPatientCode}</div>
          ) : null}
        </div>

        {message ? (
          <div
            className={`mb-5 rounded-sm border px-4 py-3 text-sm ${
              message.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-rose-500/30 bg-rose-500/10 text-rose-300"
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Name *"
              placeholder="Enter full name"
              value={form.name}
              onChange={(value) => updateField("name", value)}
              required
            />
            <Field
              label="Phone *"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
              required
            />
            <Field
              label="NIC (Optional)"
              placeholder="Enter NIC"
              value={form.nic}
              onChange={(value) => updateField("nic", value)}
            />
            <Field
              label="Date of Birth *"
              placeholder="dd/mm/yyyy"
              type="date"
              value={form.date_of_birth}
              onChange={(value) => updateField("date_of_birth", value)}
              required
            />
            <SelectField
              label="Gender *"
              value={form.gender}
              onChange={(value) => updateField("gender", value)}
              required
            />
          </div>

          <div className="my-6 border-t border-white/10" />

          <div className="mb-4">
            <h2 className="text-base font-semibold">Guardian Details (Optional)</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Guardian Name"
              placeholder="Enter guardian name"
              value={form.guardian_name}
              onChange={(value) => updateField("guardian_name", value)}
            />
            <Field
                label="Relationship"
                placeholder="Enter relationship (e.g. Father, Mother, Guardian)"
                value={form.relationship}
                onChange={(value) => updateField("relationship", value)}
            />
            <Field
              label="Guardian Phone"
              placeholder="Enter guardian phone"
              value={form.guardian_phone}
              onChange={(value) => updateField("guardian_phone", value)}
            />
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-sm muted">* Required fields</p>
            <button className="btn btn-cyan min-w-40" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </form>
      </section>

      <aside className="card card-dark p-4 h-full">
        <div className="border border-white/10 rounded-sm p-4 h-full flex flex-col">

  {duplicate ? (
    <>
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-amber-300">
          Possible Duplicate Found
        </h2>
      </div>

      <div className="flex items-start gap-3 mb-4">
        <p className="text-sm text-amber-200">
          A patient with similar information already exists.
        </p>
      </div>

      <div className="border border-white/10 rounded-sm p-3 mb-4 text-sm">
        <InfoRow label="Name" value={duplicate.name} />
        <InfoRow label="Patient ID" value={duplicate.patient_code} />
        <InfoRow label="Phone" value={duplicate.phone || "-"} />
        <InfoRow label="NIC" value={duplicate.nic || "-"} />
      </div>

      <div className="grid gap-3 mt-1">
        <Link
          href={`/receptionist/patients/${duplicate.patient_id}`}
          className="btn btn-ghost w-full"
        >
          View Existing
        </Link>

        <button
          className="btn w-full"
          type="button"
          onClick={() => setDuplicate(null)}
        >
          Continue Anyway
        </button>
      </div>

      <p className="text-sm muted mt-auto pt-4 leading-6">
        Please confirm if you want to continue with new registration.
      </p>
    </>
  ) : (
    <p className="text-sm muted">
      No duplicate detected.
    </p>
  )}

</div>
      </aside>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-semibold text-slate-100">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="input input-bordered w-full"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-semibold text-slate-100">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="input input-bordered w-full"
      >
        <option value="">Select option</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
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
