"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Calendar,
  User,
  Phone,
  CreditCard,
  FileText,
  Save,
  X,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ReceptionistPatientProfile({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const patientId = Number(resolvedParams.id);

  const { register, handleSubmit, setValue } = useForm();

  // Component states
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Deletion modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Allergy states
  const [newAllergy, setNewAllergy] = useState("");
  const [isAddingAllergy, setIsAddingAllergy] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/patients/${patientId}`);
      setPatient(response.data);
      setError(null);

      // Prepopulate form fields
      setValue("name", response.data.name);
      setValue("gender", response.data.gender);
      setValue("date_of_birth", response.data.date_of_birth ? response.data.date_of_birth.split("T")[0] : "");
      setValue("nic", response.data.nic || "");
      setValue("phone", response.data.phone || "");
      setValue("address", response.data.address || "");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load patient profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchProfile();
    }
  }, [patientId]);

  const handleEditSubmit = async (data: any) => {
    try {
      setIsSaving(true);
      setSaveStatus(null);
      const response = await api.put(`/patients/${patientId}`, data);
      setSaveStatus({
        type: "success",
        message: response.data.message || "Patient details updated successfully!"
      });
      setIsEditing(false);
      // Reload updated details
      fetchProfile();
    } catch (err: any) {
      console.error(err);
      setSaveStatus({
        type: "error",
        message: err.response?.data?.message || "Failed to update patient details."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddAllergy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllergy.trim()) return;

    try {
      setIsAddingAllergy(true);
      await api.post(`/patients/${patientId}/allergies`, {
        allergy_name: newAllergy.trim()
      });
      setNewAllergy("");
      // Reload profile to show new allergy
      fetchProfile();
    } catch (err) {
      console.error("Failed to add allergy:", err);
    } finally {
      setIsAddingAllergy(false);
    }
  };

  const handleDeletePatient = async () => {
    try {
      setIsDeleting(true);
      await api.delete(`/patients/${patientId}`);
      setIsDeleteModalOpen(false);
      // Show success alert and navigate back
      alert("Patient record deleted successfully.");
      router.push("/receptionist/patients");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete patient. Ensure you have proper permissions.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading && !patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
        <p className="text-slate-500 text-sm mt-4">Loading patient profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1000px] mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-2" size={32} />
          <h2 className="text-red-800 font-bold text-lg">Patient Not Found</h2>
          <p className="text-red-600 text-sm mt-1 mb-4">{error}</p>
          <button
            onClick={() => router.push("/receptionist/patients")}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-6" style={{ fontFamily: "inherit" }}>
      {/* Back button and profile header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/receptionist/patients")}
          className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 active:scale-95 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">Patient Card</span>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-0.5">
            {patient?.name}
          </h1>
        </div>
      </div>

      {saveStatus && (
        <div className={`p-4 rounded-xl border text-xs font-semibold mb-6 flex items-start gap-2 ${
          saveStatus.type === "success" 
            ? "bg-blue-50 border-blue-100 text-blue-800" 
            : "bg-red-50 border-red-100 text-red-800"
        }`}>
          {saveStatus.type === "success" ? <CheckCircle size={16} className="mt-0.5" /> : <AlertTriangle size={16} className="mt-0.5" />}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile view & Edit form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card Wrapper */}
          <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6 relative overflow-hidden">
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-5 mb-5">
              <div>
                <span className="font-mono text-blue-700 bg-blue-50 px-2 py-1 rounded text-xs font-bold">
                  {patient?.patient_code}
                </span>
                <span className="text-slate-400 text-xs ml-3">Gender: <strong>{patient?.gender}</strong></span>
              </div>

              {!isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-light-outline"
                  >
                    <Edit2 size={14} />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-700 rounded-lg text-xs font-bold hover:bg-red-50 transition"
                  >
                    <Trash2 size={14} />
                    <span>Delete Record</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setSaveStatus(null);
                  }}
                  className="btn-light-outline"
                >
                  <X size={14} />
                  <span>Cancel</span>
                </button>
              )}
            </div>

            {/* Profile fields Form */}
            <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="light-input-container">
                  <label className="light-label">Full Name</label>
                  <input
                    {...register("name", { required: true })}
                    disabled={!isEditing}
                    className="light-input"
                    required
                  />
                </div>

                <div className="light-input-container">
                  <label className="light-label">Gender</label>
                  <div style={{ position: "relative" }}>
                    <select
                      {...register("gender", { required: true })}
                      disabled={!isEditing}
                      className="light-select font-medium text-slate-800"
                      style={{ appearance: "none", paddingRight: "2.5rem" }}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="light-input-container">
                  <label className="light-label">Date of Birth</label>
                  <input
                    type="date"
                    {...register("date_of_birth", { required: true })}
                    disabled={!isEditing}
                    className="light-input"
                    required
                  />
                </div>

                <div className="light-input-container">
                  <label className="light-label">NIC</label>
                  <input
                    {...register("nic")}
                    disabled={!isEditing}
                    className="light-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="light-input-container">
                  <label className="light-label">Phone Number</label>
                  <input
                    {...register("phone")}
                    disabled={!isEditing}
                    className="light-input"
                  />
                </div>

                <div className="light-input-container">
                  <label className="light-label">Address</label>
                  <input
                    {...register("address")}
                    disabled={!isEditing}
                    className="light-input"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-light-blue"
                    style={{ borderRadius: "0.5rem" }}
                  >
                    <Save size={16} />
                    <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Consultation History */}
          <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-base mb-4">Consultation History</h3>

            {patient?.consultations?.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                No past consultations found for this patient.
              </div>
            ) : (
              <div className="space-y-4">
                {patient?.consultations?.map((consult: any) => (
                  <div key={consult.consultation_id} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <div className="flex items-center gap-1.5 text-blue-800 font-bold">
                        <Clock size={12} />
                        <span>{new Date(consult.visit_date).toLocaleDateString()}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        ID: #{consult.consultation_id}
                      </span>
                    </div>

                    {consult.chief_complaint && (
                      <p className="text-xs text-slate-700 font-semibold mb-1">
                        <strong>Complaint:</strong> {consult.chief_complaint}
                      </p>
                    )}
                    {consult.notes && (
                      <p className="text-xs text-slate-500">
                        <strong>Doctor Notes:</strong> {consult.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Allergies manager */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-sm mb-1">Allergies List</h3>
            <p className="text-slate-500 text-xs mb-4">Manage patient drug & food allergies.</p>

            {/* List of allergies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {patient?.allergies?.length === 0 ? (
                <span className="text-xs text-slate-400 py-1">No allergies registered.</span>
              ) : (
                patient?.allergies?.map((all: any) => (
                  <span
                    key={all.allergy_id}
                    className="px-2.5 py-1 bg-red-50 border border-red-100 text-red-800 rounded-lg text-xs font-bold"
                  >
                    {all.allergy_name}
                  </span>
                ))
              )}
            </div>

            {/* Add allergy form */}
            <form onSubmit={handleAddAllergy} className="flex gap-2">
              <input
                type="text"
                placeholder="Add allergy name..."
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                className="light-input text-xs flex-1"
                style={{ height: "36px" }}
              />
              <button
                type="submit"
                disabled={isAddingAllergy || !newAllergy.trim()}
                className="btn-light-select"
                style={{ height: "36px" }}
              >
                <Plus size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CASCADING DELETION CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}>
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-red-50 border-b border-red-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-red-900 text-base">Permanently Delete Record?</h3>
                <p className="text-red-700 text-xs">This action is permanent and cannot be undone.</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-slate-600 text-xs leading-relaxed mb-6">
                Are you absolutely sure you want to delete **{patient?.name}**?
                This will automatically cascade and delete **all associated records** in the database, including:
                <br />
                • Patient Guardians and Allergy lists.
                <br />
                • All historical Consultations and Doctor Visits.
                <br />
                • Custom Prescriptions, Invoices, and Billing statements.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePatient}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-red-600/10"
                >
                  <Trash2 size={14} />
                  <span>{isDeleting ? "Deleting..." : "Permanently Delete"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
