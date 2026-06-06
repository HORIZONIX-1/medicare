import React from "react";
import PatientSearch from "../../../components/receptionist/PatientSearch";

export const metadata = {
  title: "Patient Search",
};

export default function PatientsPage() {
  return (
    <main>
      <PatientSearch />
    </main>
  );
}
export default function Page() {
	return (
		<div className="p-6">
			<h1 className="text-lg font-semibold">Reception - Patients</h1>
			<p className="text-sm text-slate-400">Patient list and registration</p>
		</div>
	);
}
