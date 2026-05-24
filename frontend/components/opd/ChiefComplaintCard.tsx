"use client";

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

  return (
    <div className="card-modern h-full flex flex-col">

      <h2 className="card-title">
        <span className="card-number">①</span> Chief Complaint
      </h2>

      <textarea
        value={complaint}
        onChange={(e) => onChange?.(e.target.value)}
        className="complaint-textarea"
        placeholder="Document the primary reason for the patient's visit..."
      />

    </div>
  );
}