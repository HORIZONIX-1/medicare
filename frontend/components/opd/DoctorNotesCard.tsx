interface Props {
  consultation: any;
}

export default function DoctorNotesCard({
  consultation,
}: Props) {

  return (
    <div className="bg-white border rounded-lg p-4 h-full">

      <h2 className="font-semibold mb-4">
        6. Doctor Notes
      </h2>

      <textarea
        defaultValue={consultation.notes}
        className="w-full h-72 border rounded p-3"
      />

    </div>
  );
}