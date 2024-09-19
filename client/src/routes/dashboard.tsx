import { createFileRoute } from "@tanstack/react-router";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/nav/navbar";
import bg from "../../public/wave_bg.svg";
import protectedLoader from "../../db/protectedLoader";

export type DashboardSearch = {
  logout?: true;
  newtodo?: true;
  search?: true;
  newproject?: true;
};

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  loader: protectedLoader,
  validateSearch: (search: DashboardSearch) => search,
});

function Dashboard() {
  const searchParams = Route.useSearch();
  return (
    <>
      <img src={bg} alt="bg" className="absolute top-0 left-0 z-[-1] w-full" />
      <div className="flex flex-row gap-8">
        <Sidebar active="dashboard" />
        <Navbar
          title="Dashboard"
          searchParams={searchParams}
          path="/dashboard"
        />
      </div>
    </>
  );
}
