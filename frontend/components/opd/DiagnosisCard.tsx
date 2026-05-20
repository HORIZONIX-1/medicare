interface Props {
  diagnoses: any[];
}

export default function DiagnosisCard({
  diagnoses,
}: Props) {

  return (
    <div className="bg-white border rounded-lg p-4">

      <h2 className="font-semibold mb-4">
        5. Diagnosis
      </h2>

      {diagnoses.map((diagnosis) => (

        <div
          key={diagnosis.diagnosis_id}
          className="border rounded p-3 mb-3"
        >

          <p className="font-medium">
            {diagnosis.diagnosis_name}
          </p>

          <p className="text-sm text-gray-600">
            {diagnosis.notes}
          </p>

        </div>

      ))}

    </div>
  );
}