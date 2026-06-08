"use client";

import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type Guardian = {
  guardian_name: string;
  relationship: string;
  guardian_phone?: string | null;
};

type Consultation = {
  consultation_id: number;
  visit_date: string;
  notes?: string | null;
  doctor?: {
    name: string;
  } | null;
};

type PatientProfile = {
  patient_id: number;
  patient_code: string;
  name: string;
  phone?: string | null;
  nic?: string | null;
  date_of_birth: string;
  guardians: Guardian[];
  consultations: Consultation[];
};

type Props = {
  patientIdOrCode: string;
  backHref: string;
};

type ScheduleVisitForm = {
  visit_date: string;
  preferred_time: string;
  doctor_id: string;
  reason: string;
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-CA");
}

async function resolvePatientId(idOrCode: string): Promise<number | null> {
  if (/^\d+$/.test(idOrCode)) {
    return Number(idOrCode);
  }

  const response = await api.get("/patients/search", {
    params: {
      type: "patient_id",
      value: idOrCode,
    },
  });

  const match = (response.data || []).find(
    (item: { patient_code?: string }) => item.patient_code === idOrCode
  );

  return match?.patient_id ?? null;
}

function InfoRow({
  label,
  value,
  labelWidth = "90px",
}: {
  label: string;
  value: string;
  labelWidth?: string;
}) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: `${labelWidth} 12px 1fr` }}
      className="text-sm text-[#d1d5db]"
    >
      <span>{label}</span>
      <span>:</span>
      <span>{value || "-"}</span>
    </div>
  );
}

function ScheduleVisitModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (form: ScheduleVisitForm) => Promise<void>;
}) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<ScheduleVisitForm>({
    visit_date: "",
    preferred_time: "",
    doctor_id: "",
    reason: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.visit_date || !form.preferred_time) {
      setSubmitError("Visit date and preferred time are required.");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError("");
      await onSubmit(form);
      onClose();
    } catch {
      setSubmitError("Failed to schedule visit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{
        background: "rgba(2,6,23,0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl"
        style={{
          background: "rgba(17,24,39,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Schedule Visit</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-[#1f2937] hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Visit Date */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Visit Date
            </label>
            <input
              type="date"
              name="visit_date"
              value={form.visit_date}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#334155] bg-[#1f2937] px-3 py-2 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Preferred Time */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Preferred Time
            </label>
            <select
              name="preferred_time"
              value={form.preferred_time}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#334155] bg-[#1f2937] px-3 py-2 text-white outline-none focus:border-cyan-500"
            >
              <option value="">Select time</option>
              <option value="08:00">08:00 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">01:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM</option>
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Doctor
            </label>
            <select
              name="doctor_id"
              value={form.doctor_id}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#334155] bg-[#1f2937] px-3 py-2 text-white outline-none focus:border-cyan-500"
            >
              <option value="">Select doctor</option>
              <option value="1">Dr. N. Fernando</option>
              <option value="2">Dr. A. Perera</option>
              <option value="3">Dr. S. Silva</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Reason / Notes
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              placeholder="Enter reason or notes"
              className="w-full resize-none rounded-lg border border-[#334155] bg-[#1f2937] px-3 py-2 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          {submitError && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {submitError}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={submitting}
              className="flex-1 rounded-lg border border-[#334155] bg-[#1f2937] py-2.5 font-medium text-slate-300 transition-colors hover:bg-[#263244] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 rounded-lg border border-[#334155] bg-[#0b0f14] py-2.5 font-medium text-white transition-colors hover:bg-[#1f2937] disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Visit"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PatientProfileView({ patientIdOrCode, backHref }: Props) {
  const router = useRouter();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const resolvedPatientId = await resolvePatientId(patientIdOrCode);

        if (!resolvedPatientId) {
          setError("Patient profile not found.");
          return;
        }

        const response = await api.get(`/patients/${resolvedPatientId}`);
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to load patient profile:", err);
        setError("Failed to load patient profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [patientIdOrCode]);

  const guardian = useMemo(() => profile?.guardians?.[0], [profile]);

  const handleScheduleSubmit = async (form: ScheduleVisitForm) => {
    if (!profile) return;
    await api.post("/consultations", {
      patient_id: profile.patient_id,
      visit_date: form.visit_date,
      preferred_time: form.preferred_time,
      doctor_id: form.doctor_id || undefined,
      notes: form.reason || undefined,
    });
    const response = await api.get(`/patients/${profile.patient_id}`);
    setProfile(response.data);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f14] px-4 py-8 text-[#e5e7eb]">
        <div className="mx-auto max-w-5xl rounded-md border border-[#2a3342] bg-[#111827] p-10 text-center text-sm font-medium">
          Loading patient profile...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#0b0f14] px-4 py-8 text-[#e5e7eb]">
        <div className="mx-auto max-w-5xl rounded-md border border-[#2a3342] bg-[#111827] p-8">
          <p className="text-sm font-semibold text-red-400">
            {error || "Patient profile not found."}
          </p>
          <button
            onClick={() => router.push(backHref)}
            className="mt-4 rounded-md border border-[#334155] bg-[#1f2937] px-4 py-2 text-xs font-semibold text-[#e5e7eb] hover:bg-[#263244]"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#0b0f14] px-4 py-8 text-[#e5e7eb]">
        <div className="mx-auto max-w-5xl space-y-4">

          {/* Top bar: Back + Patient ID + Schedule Visit */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-[#2a3342] bg-[#111827] px-4 py-3">
            <button
              onClick={() => router.push(backHref)}
              className="rounded-md border border-[#334155] bg-[#1f2937] px-4 py-2 text-sm font-semibold text-[#f3f4f6] hover:bg-[#263244]"
            >
              ← Back
            </button>

            <div className="flex items-center gap-2">
              <div className="rounded-md border border-[#334155] bg-[#1f2937] px-4 py-2 text-sm font-semibold text-[#f9fafb]">
                Patient ID: {profile.patient_code}
              </div>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="rounded-md border border-[#334155] bg-[#0b0f14] px-4 py-2 text-sm font-semibold text-[#f3f4f6] hover:bg-[#1f2937]"
              >
                + Schedule Visit
              </button>
            </div>
          </div>

          {/* Patient Info + Guardian Info side by side */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <section className="rounded-md border border-[#2a3342] bg-[#111827] p-4">
              <h2 className="mb-3 text-sm font-bold text-[#f3f4f6]">Patient Information</h2>
              <div className="space-y-2">
                <InfoRow label="Name" value={profile.name} />
                <InfoRow label="Phone" value={profile.phone ?? "-"} />
                <InfoRow label="NIC" value={profile.nic ?? "-"} />
                <InfoRow label="Date of Birth" value={formatDate(profile.date_of_birth)} />
              </div>
            </section>

            <section className="rounded-md border border-[#2a3342] bg-[#111827] p-4">
              <h2 className="mb-3 text-sm font-bold text-[#f3f4f6]">Guardian Information</h2>
              <div className="space-y-2">
                <InfoRow label="Guardian Name" value={guardian?.guardian_name ?? "-"} labelWidth="110px" />
                <InfoRow label="Relationship" value={guardian?.relationship ?? "-"} labelWidth="110px" />
                <InfoRow label="Guardian Phone" value={guardian?.guardian_phone ?? "-"} labelWidth="110px" />
              </div>
            </section>
          </div>

          {/* Visit History */}
          <section className="rounded-md border border-[#2a3342] bg-[#111827] p-4">
            <h2 className="mb-3 text-sm font-bold text-[#f3f4f6]">Visit History</h2>

            {profile.consultations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[#d1d5db]">
                  <thead>
                    <tr className="bg-[#1e293b] text-[#f3f4f6]">
                      <th className="border border-[#2a3342] px-3 py-2 font-semibold">Date</th>
                      <th className="border border-[#2a3342] px-3 py-2 font-semibold">Doctor</th>
                      <th className="border border-[#2a3342] px-3 py-2 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.consultations.map((visit) => (
                      <tr key={visit.consultation_id} className="hover:bg-[#1b2538]">
                        <td className="border border-[#2a3342] px-3 py-2 whitespace-nowrap">
                          {formatDate(visit.visit_date)}
                        </td>
                        <td className="border border-[#2a3342] px-3 py-2 whitespace-nowrap">
                          {visit.doctor?.name || "-"}
                        </td>
                        <td className="border border-[#2a3342] px-3 py-2">
                          {visit.notes || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-[#334155] bg-[#0f172a] px-4 py-6 text-center text-sm text-[#9ca3af]">
                <div className="mb-2 text-xl">🔒</div>
                No previous visits
              </div>
            )}
          </section>

        </div>
      </div>

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <ScheduleVisitModal
          onClose={() => setShowScheduleModal(false)}
          onSubmit={handleScheduleSubmit}
        />
      )}
    </>
  );
}