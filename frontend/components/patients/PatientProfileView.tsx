"use client";

import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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

function InfoRow({ label, value, labelWidth = "90px" }: { label: string; value: string; labelWidth?: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `${labelWidth} 12px 1fr` }} className="text-sm text-[#d1d5db]">
      <span>{label}</span>
      <span>:</span>
      <span>{value || "-"}</span>
    </div>
  );
}

export default function PatientProfileView({ patientIdOrCode, backHref }: Props) {
  const router = useRouter();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          <p className="text-sm font-semibold text-red-400">{error || "Patient profile not found."}</p>
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
    <div className="min-h-screen bg-[#0b0f14] px-4 py-8 text-[#e5e7eb]">
      <div className="mx-auto max-w-5xl space-y-4">

        {/* Top bar: Back + Patient ID */}
        <div className="flex items-center justify-between rounded-md border border-[#2a3342] bg-[#111827] px-4 py-3">
          <button
            onClick={() => router.push(backHref)}
            className="rounded-md border border-[#334155] bg-[#1f2937] px-4 py-2 text-sm font-semibold text-[#f3f4f6] hover:bg-[#263244]"
          >
            ← Back
          </button>
          <div className="rounded-md border border-[#334155] bg-[#1f2937] px-4 py-2 text-sm font-semibold text-[#f9fafb]">
            Patient ID: {profile.patient_code}
          </div>
        </div>

        {/* Patient Info + Guardian Info side by side */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Patient Information */}
          <section className="rounded-md border border-[#2a3342] bg-[#111827] p-4">
            <h2 className="mb-3 text-sm font-bold text-[#f3f4f6]">Patient Information</h2>
            <div className="space-y-2">
              <InfoRow label="Name" value={profile.name} />
              <InfoRow label="Phone" value={profile.phone ?? "-"} />
              <InfoRow label="NIC" value={profile.nic ?? "-"} />
              <InfoRow label="Date of Birth" value={formatDate(profile.date_of_birth)} />
            </div>
          </section>

          {/* Guardian Information */}
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
  );
}