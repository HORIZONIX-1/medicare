import React from "react";
import ReceptionistShell from "../../../components/receptionist/ReceptionistShell";
import RecentPatients from "../../../components/receptionist/RecentPatients";

export const metadata = {
  title: "Recent Patients",
};

export default function RecentPatientsPage() {
  return (
    <ReceptionistShell title="Recent Patients">
      <RecentPatients />
    </ReceptionistShell>
  );
}
