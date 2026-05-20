interface Props {
  consultationId: number;

  examinations: any[];
}

export default function ExaminationCard({
  examinations,
}: Props) {

  return (
    <div className="bg-white border rounded-lg p-4">

      <h2 className="font-semibold mb-4">
        3. Physical Examination
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="border p-2">
              Examination
            </th>

            <th className="border p-2">
              Result
            </th>
          </tr>

        </thead>

        <tbody>

          {examinations.map((exam) => (

            <tr key={exam.examination_id}>

              <td className="border p-2">
                {exam.title}
              </td>

              <td className="border p-2">
                {exam.result}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}