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

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setSavedPatientCode(null);

    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim() || undefined,
        nic: form.nic.trim() || undefined,
        date_of_birth: form.date_of_birth,
        gender: form.gender,
        address: undefined,
        guardian_name: form.guardian_name.trim() || undefined,
        guardian_phone: form.guardian_phone.trim() || undefined,
        relationship: form.relationship.trim() || undefined,
      };

      const response = await api.post("/patients", payload);

      setSavedPatientCode(response.data?.patient_code || null);
      setMessage({
        type: "success",
        text: `Patient saved successfully${response.data?.patient_code ? ` as ${response.data.patient_code}` : ""}.`,
      });
      setForm(initialState);
    } catch (error: any) {
      console.error(error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Registration failed. Please verify the patient details.",
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
            <button className="btn w-full" type="button">
              Continue Anyway
            </button>
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
