import api from "./axios";
import type { QueueItem } from "@/components/prescription/DispensingQueueTable";
import type { HistoryItem } from "@/components/prescription/DispensingHistoryTable";

export interface ApiPrescription {
  prescription_id: number;
  consultation_id: number;
  created_at: string;
  items: {
    prescription_item_id: number;
    drug_name: string;
    dosage?: string | null;
    quantity: number;
    is_outside_drug: boolean;
  }[];
  invoice?: {
    invoice_id: number;
    is_finalized: boolean;
    is_patient_denied: boolean;
    finalized_at?: string | null;
  } | null;
  consultation?: {
    notes?: string | null;
    patient?: {
      patient_code: string;
      name: string;
      gender: string;
      date_of_birth: string;
    };
    doctor?: { name: string };
    diagnoses?: { diagnosis_name: string }[];
  };
}

export const fetchPrescriptions = async (): Promise<ApiPrescription[]> => {
  const res = await api.get("/prescriptions");
  return Array.isArray(res.data) ? res.data : [];
};

export const isDispensed = (p: ApiPrescription) => Boolean(p.invoice?.is_finalized);

const ageFrom = (dob?: string) => {
  if (!dob) return "—";
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return "—";
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());
  if (beforeBirthday) years -= 1;
  return `${Math.max(0, years)} Years`;
};

export const toLocalDateKey = (value: string | Date) => {
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const common = (p: ApiPrescription) => {
  const consultation = p.consultation;
  return {
    name: consultation?.patient?.name || "Unknown patient",
    pid: consultation?.patient?.patient_code || "—",
    age: ageFrom(consultation?.patient?.date_of_birth),
    gender: consultation?.patient?.gender || "—",
    diagnosis:
      consultation?.diagnoses?.map((d) => d.diagnosis_name).join(", ") || "Not recorded",
    doctor: consultation?.doctor?.name ? `Dr. ${consultation.doctor.name.replace(/^Dr\.?\s*/i, "")}` : "—",
  };
};

export const toQueueItem = (p: ApiPrescription): QueueItem => {
  const base = common(p);
  const clinicItems = p.items.filter((item) => !item.is_outside_drug);
  const outsideItems = p.items.filter((item) => item.is_outside_drug);

  const alerts: string[] = [];
  if (!p.invoice) {
    alerts.push("Awaiting billing: the doctor has not issued an invoice for this visit yet.");
  }
  outsideItems.forEach((item) =>
    alerts.push(`${item.drug_name} is an outside drug and is purchased externally.`)
  );

  return {
    id: p.prescription_id,
    ...base,
    date: toLocalDateKey(p.created_at),
    drugs: clinicItems.map((item) => ({
      name: item.drug_name,
      strength: item.dosage || "—",
      type: "Clinic stock",
      qty: item.quantity,
    })),
    alerts,
    notes: p.consultation?.notes || undefined,
  };
};

export const toHistoryItem = (p: ApiPrescription): HistoryItem => {
  const base = common(p);
  const when = new Date(p.invoice?.finalized_at || p.created_at);
  const declined = Boolean(p.invoice?.is_patient_denied);

  return {
    id: p.prescription_id,
    date: toLocalDateKey(when),
    time: when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    prescriptionId: `RX-${String(p.prescription_id).padStart(5, "0")}`,
    patientName: base.name,
    patientId: base.pid,
    age: base.age,
    gender: base.gender,
    diagnosis: base.diagnosis,
    doctor: base.doctor,
    status: declined ? "Declined" : "Fully Dispensed",
    dispenser: "",
    drugs: p.items
      .filter((item) => !item.is_outside_drug)
      .map((item) => ({
        name: item.drug_name,
        type: item.dosage || "—",
        prescribedQty: item.quantity,
        dispensedQty: declined ? 0 : item.quantity,
      })),
    notes: declined ? "Patient declined to purchase the prescribed medicines." : "",
  };
};
