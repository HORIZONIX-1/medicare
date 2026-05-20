"use client";

import { useState } from "react";
import api from "@/lib/axios";

interface Props {
  consultation: any;
  onUpdate?: () => void;
}

export default function ChiefComplaintCard({
  consultation,
  onUpdate,
}: Props) {
  const [complaint, setComplaint] = useState(
    consultation.chief_complaint || ""
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put(
        `/consultations/${consultation.consultation_id}`,
        { chief_complaint: complaint }
      );
      onUpdate?.();
    } catch (error) {
      console.error("Failed to update chief complaint:", error);
      alert("Failed to save chief complaint");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="card-modern h-full flex flex-col">

      <h2 className="card-title">
        <span className="card-number">①</span> Chief Complaint
      </h2>

      <textarea
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        className="complaint-textarea"
        placeholder="Document the primary reason for the patient's visit..."
      />

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="btn-indigo-gradient mt-4 w-full"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>

    </div>
  );
}