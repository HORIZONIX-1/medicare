"use client";

import { useEffect, useState } from "react";

// client-only controlled component

interface Props {
  consultation?: any;
  value?: string;
  onChange?: (value: string) => void;
}

export default function ChiefComplaintCard({
  consultation,
  value,
  onChange,
}: Props) {
  const complaint = value ?? consultation?.chief_complaint ?? "";
  const [isEditing, setIsEditing] = useState(!complaint.trim());

  useEffect(() => {
    if (!complaint.trim()) {
      setIsEditing(true);
    }
  }, [complaint]);

  return (
    <div className="card-modern h-full flex flex-col">

      <div className="flex items-center justify-between gap-3">
        <h2 className="card-title">
          <span className="card-number">①</span> Chief Complaint
        </h2>
        {complaint.trim() && !isEditing && (
          <button type="button" onClick={() => setIsEditing(true)} className="btn-cyan">
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={complaint}
          onChange={(e) => onChange?.(e.target.value)}
          className="complaint-textarea"
          placeholder="Document the primary reason for the patient's visit..."
        />
      ) : (
        <div className="complaint-textarea whitespace-pre-wrap text-slate-100">
          {complaint}
        </div>
      )}

    </div>
  );
}