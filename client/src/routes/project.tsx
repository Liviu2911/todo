import { createFileRoute } from "@tanstack/react-router";
import { SearchParams } from "../types";
import { SearchParamsContext } from "./__root";
import { useContext } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Newproject from "@/components/newproject";
import EditProject from "@/components/editproject";
import Create from "@/components/create";

export const Route = createFileRoute("/project")({
  component: Project,
  validateSearch: (search: SearchParams) => search,
});

function Project() {
  const { newproject, editid, create } = useContext(SearchParamsContext);
  return (
    <>
      <div className="flex flex-row gap-[5vh] m-[5vh]">
        <Sidebar />
        <Navbar />
      </div>
      {newproject && <Newproject />}
      {editid && <EditProject />}
      {create && <Create />}
    </>
  );
}
