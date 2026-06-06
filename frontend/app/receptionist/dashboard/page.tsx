import React from "react";
import ReceptionistDashboard from "../../../components/receptionist/ReceptionistDashboard";
import ReceptionistShell from "../../../components/receptionist/ReceptionistShell";

export const metadata = {
  title: "Receptionist Dashboard",
};

export default function DashboardPage() {
  return (
    <ReceptionistShell title="Dashboard">
      <ReceptionistDashboard />
    </ReceptionistShell>
  );
}
