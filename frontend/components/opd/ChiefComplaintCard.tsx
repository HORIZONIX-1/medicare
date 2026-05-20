interface Props {
  consultation: any;
}

export default function ChiefComplaintCard({
  consultation,
}: Props) {

  return (
    <div className="bg-white border rounded-lg p-4 h-full">

      <h2 className="font-semibold mb-4">
        1. Chief Complaint
      </h2>

      <textarea
        defaultValue={
          consultation.chief_complaint
        }
        className="w-full border rounded p-3 h-64"
        placeholder="Write chief complaint..."
      />

    </div>
  );
}