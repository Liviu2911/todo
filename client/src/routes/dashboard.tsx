import { createFileRoute } from "@tanstack/react-router";
import loader from "../../db/protected";
import Sidebar from "@/components/sidebar";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  loader,
});

function Dashboard() {
  return (
    <>
      <Sidebar active="dashboard" />
    </>
  );
}
