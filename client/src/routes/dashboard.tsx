import { createFileRoute } from "@tanstack/react-router";
import loader from "../../db/protected";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  loader,
});

function Dashboard() {
  return "dashboard";
}
