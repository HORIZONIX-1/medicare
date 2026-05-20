interface Props {
  consultationId: number;

  symptoms: any[];
}

export default function SymptomsCard({
  symptoms,
}: Props) {

  return (
    <div className="bg-white border rounded-lg p-4">

      <h2 className="font-semibold mb-4">
        2. Symptoms
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="border p-2">
              Symptom
            </th>

            <th className="border p-2">
              Severity
            </th>

            <th className="border p-2">
              Duration
            </th>
          </tr>

        </thead>

        <tbody>

          {symptoms.map((item) => (

            <tr
              key={
                item.consultation_symptom_id
              }
            >

              <td className="border p-2">
                {item.symptom.name}
              </td>

              <td className="border p-2">
                {item.severity}/10
              </td>

              <td className="border p-2">
                {item.duration_value}
                {" "}
                {item.duration_unit}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}