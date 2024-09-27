import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar/index";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex flex-row m-[5vh] gap-[5vh]">
      <Sidebar />
      <Navbar />
    </div>
  );
}
