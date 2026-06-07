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
      <div className="min-h-screen bg-[#f5f6f8] px-4 py-8 text-[#1f2937]">
        <div className="mx-auto max-w-5xl rounded-md border border-[#d1d5db] bg-white p-10 text-center text-sm font-medium">
          Loading patient profile...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] px-4 py-8 text-[#1f2937]">
        <div className="mx-auto max-w-5xl rounded-md border border-[#d1d5db] bg-white p-8">
          <p className="text-sm font-semibold text-red-600">{error || "Patient profile not found."}</p>
          <button
            onClick={() => router.push(backHref)}
            className="mt-4 rounded-md border border-[#b8bec8] bg-[#f3f4f6] px-4 py-2 text-xs font-semibold text-[#111827] hover:bg-[#e5e7eb]"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-4 py-8 text-[#111827]">
      <div className="mx-auto max-w-5xl rounded-md border border-[#d1d5db] bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d1d5db] pb-4">
          <button
            onClick={() => router.push(backHref)}
            className="rounded-md border border-[#b8bec8] bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-[#111827] hover:bg-[#eef2f7]"
          >
            ← Back
          </button>

          <div className="rounded-md border border-[#b8bec8] bg-[#f8fafc] px-4 py-2 text-sm font-semibold">
            Patient ID: {profile.patient_code}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <section className="rounded-md border border-[#d1d5db] p-4">
            <h2 className="mb-3 text-sm font-bold">Patient Information</h2>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-[90px_12px_1fr]">
                <span>Name</span>
                <span>:</span>
                <span>{profile.name || "-"}</span>
              </div>
              <div className="grid grid-cols-[90px_12px_1fr]">
                <span>Phone</span>
                <span>:</span>
                <span>{profile.phone || "-"}</span>
              </div>
              <div className="grid grid-cols-[90px_12px_1fr]">
                <span>NIC</span>
                <span>:</span>
                <span>{profile.nic || "-"}</span>
              </div>
              <div className="grid grid-cols-[90px_12px_1fr]">
                <span>Date of Birth</span>
                <span>:</span>
                <span>{formatDate(profile.date_of_birth)}</span>
              </div>
            </div>
          </section>

          <section className="rounded-md border border-[#d1d5db] p-4">
            <h2 className="mb-3 text-sm font-bold">Guardian Information</h2>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-[110px_12px_1fr]">
                <span>Guardian Name</span>
                <span>:</span>
                <span>{guardian?.guardian_name || "-"}</span>
              </div>
              <div className="grid grid-cols-[110px_12px_1fr]">
                <span>Relationship</span>
                <span>:</span>
                <span>{guardian?.relationship || "-"}</span>
              </div>
              <div className="grid grid-cols-[110px_12px_1fr]">
                <span>Guardian Phone</span>
                <span>:</span>
                <span>{guardian?.guardian_phone || "-"}</span>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-4 rounded-md border border-[#d1d5db] p-3 sm:p-4">
          <h2 className="mb-3 text-sm font-bold">Visit History</h2>

          {profile.consultations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#f8fafc]">
                    <th className="border border-[#d1d5db] px-3 py-2">Date</th>
                    <th className="border border-[#d1d5db] px-3 py-2">Doctor</th>
                    <th className="border border-[#d1d5db] px-3 py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.consultations.map((visit) => (
                    <tr key={visit.consultation_id}>
                      <td className="border border-[#d1d5db] px-3 py-2">{formatDate(visit.visit_date)}</td>
                      <td className="border border-[#d1d5db] px-3 py-2">{visit.doctor?.name || "-"}</td>
                      <td className="border border-[#d1d5db] px-3 py-2">{visit.notes || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-[#d1d5db] px-4 py-5 text-center text-sm text-[#4b5563]">
              <div className="mb-2 text-xl">🔒</div>
              No previous visits
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
