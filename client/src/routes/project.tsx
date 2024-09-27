import { createFileRoute } from "@tanstack/react-router";
import { SearchParams } from "../types";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export const Route = createFileRoute("/project")({
  component: Project,
  validateSearch: (search: SearchParams) => search,
});

function Project() {
  const { id } = Route.useSearch();
  return (
    <>
      <div className="flex flex-row gap-[5vh] m-[5vh]">
        <Sidebar />
        <Navbar id={id} />
      </div>
    </>
  );
}
