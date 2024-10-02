import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar/index";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { SearchParamsContext } from "./__root";
import Newproject from "@/components/newproject";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const params = useContext(SearchParamsContext);
  return (
    <>
      <div className="flex flex-row m-[5vh] gap-[5vh]">
        <Sidebar />
        <Navbar />
      </div>
      {params.newproject && <Newproject />}
    </>
  );
}
