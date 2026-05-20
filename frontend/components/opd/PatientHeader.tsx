interface Props {
  patient: any;
}

export default function PatientHeader({
  patient,
}: Props) {

  return (
    <div className="bg-white rounded-lg p-4 border">

      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            {patient.name}
          </h2>

          <p>
            Patient ID:
            {patient.patient_code}
          </p>

          <p>
            Phone:
            {patient.phone}
          </p>

        </div>

      </div>

    </div>
  );
}