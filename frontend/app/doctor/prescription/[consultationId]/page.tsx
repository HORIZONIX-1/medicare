"use client";

import { useEffect, useMemo, useState, use } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/axios";
import { PrescriptionItem } from "@/types/prescription";
import DrugSearchInput from "@/components/prescription/DrugSearchInput";

interface Props {
  params: Promise<{
    consultationId: string;
  }>;
}

export default function PrescriptionPage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);

  const [consultation, setConsultation] = useState<any | null>(null);
  const [items, setItems] = useState<PrescriptionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [outsideDrug, setOutsideDrug] = useState({
    drug_name: "",
    instructions: "",
    quantity: "",
  });

  useEffect(() => {
    let active = true;

    const fetchConsultation = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await api.get(`/consultations/${resolvedParams.consultationId}`);

        if (!active) return;

        setConsultation(response.data);

        const existingItems = response.data.prescription_items ?? response.data.items ?? [];
        if (Array.isArray(existingItems) && existingItems.length > 0) {
          setItems(existingItems);
        } else {
          setItems([
            {
              drug_name: "",
              dosage: "1 Tablet",
              instruction_1: "",
              instruction_2: "",
              instruction_3: "",
              frequency: "1 Time / Day",
              duration: "5 Days",
              quantity: 1,
              price: 0,
              is_outside_drug: false,
              available_quantity: undefined,
              stock_status: undefined,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
        if (active) setLoadError("Unable to load prescription details.");
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchConsultation();

    return () => {
      active = false;
    };
  }, [resolvedParams.consultationId]);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + (Number(item.price) || 0), 0),
    [items]
  );

  const totalItems = items.length;

  const patient = consultation?.patient ?? {
    name: "Kamal Perera",
    patient_code: "P000123",
    date_of_birth: undefined,
  };

  const doctor = consultation?.doctor ?? null;

  const diagnoses = Array.isArray(consultation?.diagnoses)
    ? consultation.diagnoses.map((diagnosis: any) => diagnosis.diagnosis_name).filter(Boolean)
    : [];

  const visitDate =
    consultation?.visit_date || consultation?.created_at || consultation?.appointment_date || "2024-05-20";

  const allergies = Array.isArray(consultation?.patient?.allergies)
    ? consultation.patient.allergies.map((allergy: any) => allergy.allergy_name).filter(Boolean)
    : [];

  const parseQuantity = (frequency?: string, duration?: string, dosage?: string) => {
    const frequencyValue = Number((frequency || "").split(" ")[0]);
    const durationValue = Number((duration || "").split(" ")[0]);
    const dosageValue = dosage?.startsWith("2") ? 2 : 1;

    if (!Number.isFinite(frequencyValue) || !Number.isFinite(durationValue) || durationValue <= 0) {
      return 1;
    }

    return Math.max(1, frequencyValue * durationValue * dosageValue);
  };

  const updateItem = (index: number, data: any) => {
    setItems((current) => {
      const next = [...current];
      next[index] = {
        ...next[index],
        ...data,
      };

      next[index].quantity = parseQuantity(next[index].frequency, next[index].duration, next[index].dosage);
      return next;
    });
  };

  const addMedicineRow = () => {
    setItems((current) => [
      ...current,
      {
        drug_name: "",
        dosage: "1 Tablet",
        instruction_1: "",
        instruction_2: "",
        instruction_3: "",
        frequency: "1 Time / Day",
        duration: "5 Days",
        quantity: 5,
        price: 0,
        is_outside_drug: false,
      },
    ]);
  };

  const addOutsideDrug = () => {
    if (!outsideDrug.drug_name.trim()) return;

    setItems((current) => [
      ...current,
      {
        drug_name: outsideDrug.drug_name.trim(),
        dosage: "1 Tablet",
        instruction_1: outsideDrug.instructions.trim(),
        instruction_2: "",
        instruction_3: "",
        frequency: "1 Time / Day",
        duration: "1 Day",
        quantity: Number(outsideDrug.quantity) || 1,
        price: 0,
        is_outside_drug: true,
      },
    ]);

    setOutsideDrug({ drug_name: "", instructions: "", quantity: "" });
  };

  const savePrescription = async () => {
    try {
      const response = await api.post("/prescriptions", {
        consultation_id: Number(resolvedParams.consultationId),
        total_amount: totalAmount,
        items,
      });

      const prescriptionId = response.data?.prescription_id;

      if (!prescriptionId) {
        throw new Error("Prescription was saved, but the invoice route could not be determined.");
      }

      router.push(`/doctor/invoice/${prescriptionId}`);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to save prescription");
    }
  };

  const lowStockItem = items.find((item) => item.stock_status === "LOW_STOCK");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 px-3 py-4 sm:px-5 lg:px-6">
        <div className="mx-auto flex max-w-[1280px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 p-10 text-slate-200 shadow-sm">
          Loading prescription...
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-950 px-3 py-4 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-[1280px] rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-200 shadow-sm">
          {loadError}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-slate-100 shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push(`/doctor/opd/${resolvedParams.consultationId}`)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800"
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold text-slate-50">Prescription</h1>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span>📅</span>
            <span>🔔</span>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-slate-700" />
              <div className="text-right leading-tight">
                <p className="text-sm font-semibold text-slate-50">
                  {doctor?.name || "Doctor Profile"}
                </p>
                <p className="text-xs text-slate-400">
                  {doctor?.role || "DOCTOR"}
                </p>
              </div>
            </div>
            <span>⌄</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-2xl text-slate-200">👤</div>
              <div>
                <div className="mt-2 grid grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-3">
                  <div>
                    <div className="text-xs">Name</div>
                    <div className="font-medium text-slate-100">{patient.name || "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs">Patient Code</div>
                    <div className="font-medium text-slate-100">{patient.patient_code || "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs">Date of Birth</div>
                    <div className="font-medium text-slate-100">{patient.date_of_birth ? String(patient.date_of_birth).slice(0,10) : "-"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
                <p className="text-xs text-slate-400">Visit Date</p>
                <p className="mt-1 text-sm font-medium text-slate-100">{String(visitDate).slice(0, 10)}</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
                <p className="text-xs text-slate-400">Diagnosis</p>
                <p className="mt-1 text-sm font-medium text-slate-100">{diagnoses[0] || "Viral Fever"}</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
                <p className="text-xs text-slate-400">Allergies</p>
                <p className="mt-1 text-sm font-medium text-slate-100">
                  {allergies.length > 0 ? allergies.join(", ") : "No allergies recorded"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push(`/doctor/opd/${resolvedParams.consultationId}`)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800"
            >
              ← Back to OPD
            </button>
          </div>
        </div>

        {lowStockItem && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            <span className="font-medium">⚠ Stock Alert:</span> {lowStockItem.drug_name} has only {lowStockItem.available_quantity ?? lowStockItem.quantity} tablets remaining in stock.
          </div>
        )}

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-50">Enter Prescription Medicines</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addMedicineRow}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 hover:bg-slate-800"
              >
                + Add Medicine
              </button>
              <button
                type="button"
                onClick={addOutsideDrug}
                className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm text-blue-100 hover:bg-blue-500/20"
              >
                + Add Outside Drug
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-slate-900 text-slate-200">
                <tr>
                  {[
                    "#",
                    "Drug Name (Type)",
                    "Dosage",
                    "Instruction 1 (Speciality)",
                    "Instruction 2 (Before / After Meals)",
                    "Instruction 3 (Special Notes)",
                    "Frequency (Times per day)",
                    "Duration (Days)",
                    "Quantity (Auto)",
                    "Price (Rs.)",
                    "Patient Denying?",
                    "Action",
                  ].map((label) => (
                    <th key={label} className="whitespace-nowrap border-b border-slate-800 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-slate-800 align-top">
                    <td className="px-3 py-3 text-slate-100">{index + 1}</td>
                    <td className="px-3 py-3">
                      <div>
                        {/* Shared autocomplete input */}
                        <DrugSearchInput
                          value={item.drug_name}
                          onChange={(val) => updateItem(index, { drug_name: val })}
                          onSelect={(drug) => updateItem(index, {
                            drug_id: drug.drug_id,
                            drug_name: drug.name,
                            price: drug.selling_price,
                            available_quantity: drug.available_quantity,
                            stock_status: drug.stock_status,
                          })}
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-400">Type: {item.is_outside_drug ? "Outside Drug" : item.dosage?.includes("Cream") ? "Cream" : "Tablet"}</p>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={item.dosage || "1 Tablet"}
                        onChange={(e) => updateItem(index, { dosage: e.target.value })}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100"
                      >
                        <option>1 Tablet</option>
                        <option>2 Tablets</option>
                        <option>Apply to affected area</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={item.instruction_1 || ""}
                        onChange={(e) => updateItem(index, { instruction_1: e.target.value })}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100"
                      >
                        <option>Only at night</option>
                        <option>At Night</option>
                        <option>Apply to affected area</option>
                        <option>On empty stomach</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={item.instruction_2 || ""}
                        onChange={(e) => updateItem(index, { instruction_2: e.target.value })}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100"
                      >
                        <option>After Food</option>
                        <option>Before Food</option>
                        <option>N/A</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        value={item.instruction_3 || ""}
                        onChange={(e) => updateItem(index, { instruction_3: e.target.value })}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100 placeholder-slate-500"
                        placeholder="Special notes"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={item.frequency || "1 Time / Day"}
                        onChange={(e) => updateItem(index, { frequency: e.target.value })}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100"
                      >
                        <option>1 Time / Day</option>
                        <option>2 Times / Day</option>
                        <option>3 Times / Day</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={item.duration || "5 Days"}
                        onChange={(e) => updateItem(index, { duration: e.target.value })}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100"
                      >
                        <option>3 Days</option>
                        <option>5 Days</option>
                        <option>7 Days</option>
                        <option>--</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        value={item.quantity}
                        onChange={(e) => updateItem(index, { quantity: Number(e.target.value) || 0 })}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100 placeholder-slate-500"
                      />
                      <p className="mt-1 text-xs text-slate-400">D x F x D</p>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        value={item.price}
                        onChange={(e) => updateItem(index, { price: Number(e.target.value) || 0 })}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100"
                      />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={Boolean((item as any).patient_denying)}
                        onChange={(e) => updateItem(index, { patient_denying: e.target.checked })}
                        className="h-4 w-4 rounded border-slate-600 bg-slate-900"
                      />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => setItems((current) => current.filter((_, rowIndex) => rowIndex !== index))}
                        className="rounded-md border border-slate-700 px-2 py-2 text-slate-300 hover:bg-slate-800"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-xs text-slate-400">* Quantity is auto-calculated based on Duration (D) x Frequency (F) x Dosage (D).</div>

          <div className="mt-4 flex items-center justify-end gap-6 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm">
            <div className="font-semibold text-slate-100">Total Items: {totalItems}</div>
            <div className="font-semibold text-slate-100">Total Amount: Rs. {totalAmount.toFixed(2)}</div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-50">Outside Drug (Not in System)</h2>
          <div className="grid gap-3 lg:grid-cols-[1.1fr_1.4fr_0.8fr_auto]">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">Drug Name</label>
              <input
                value={outsideDrug.drug_name}
                onChange={(e) => setOutsideDrug((current) => ({ ...current, drug_name: e.target.value }))}
                placeholder="Enter drug name"
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">Instructions</label>
              <input
                value={outsideDrug.instructions}
                onChange={(e) => setOutsideDrug((current) => ({ ...current, instructions: e.target.value }))}
                placeholder="Enter instructions"
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">Quantity</label>
              <input
                value={outsideDrug.quantity}
                onChange={(e) => setOutsideDrug((current) => ({ ...current, quantity: e.target.value }))}
                placeholder="Enter quantity"
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={addOutsideDrug}
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 hover:bg-slate-800"
              >
                + Add Outside Drug
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => router.push(`/doctor/opd/${resolvedParams.consultationId}`)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800 sm:self-start"
          >
            ← Back to OPD
          </button>

          <button
            type="button"
            onClick={savePrescription}
            className="rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-white sm:self-end"
          >
            Proceed to Invoice →
          </button>
        </div>
      </div>
    </div>
  );
}