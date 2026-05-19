"use client";

import { Patient } from "@/types/patient";
import { useRouter } from "next/navigation";

interface Props {
  patients: Patient[];
}

export default function PatientTable({
  patients,
}: Props) {

  const router = useRouter();

  return (
    <div className="border rounded-lg p-5 bg-white">

      <h2 className="font-semibold mb-4">
        2. SEARCH RESULTS
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">
              Patient ID
            </th>

            <th className="border p-2">
              Name
            </th>

            <th className="border p-2">
              NIC
            </th>

            <th className="border p-2">
              Phone
            </th>

            <th className="border p-2">
              Action
            </th>
          </tr>
        </thead>

        <tbody>

          {patients.map((patient) => (
            <tr key={patient.patient_id}>

              <td className="border p-2">
                {patient.patient_code}
              </td>

              <td className="border p-2">
                {patient.name}
              </td>

              <td className="border p-2">
                {patient.nic}
              </td>

              <td className="border p-2">
                {patient.phone}
              </td>

              <td className="border p-2 flex gap-2">

                <button
                  onClick={() =>
                    router.push(
                      `/doctor/patients/${patient.patient_id}`
                    )
                  }
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  Open Profile
                </button>

                <button
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  Start Visit
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}