import { createFileRoute } from "@tanstack/react-router";
import { SearchParams } from "../types";
import { Data, SearchParamsContext } from "./__root";
import { useContext } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Newproject from "@/components/newproject";
import EditProject from "@/components/editproject";
import Create from "@/components/create";
import Status from "@/components/status";
import EditStatus from "@/components/editstatus";
import EditTodo from "@/components/edittodo";
import Search from "@/components/search";
import { AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/project")({
  component: Project,
  validateSearch: (search: SearchParams) => search,
});

function Project() {
  const { newproject, create, id, edit, editstatus, edittodo, search } =
    useContext(SearchParamsContext);
  const { projects } = useContext(Data);
  const { statuses } = projects?.filter((item) => item.id === id)[0] || [];
  return (
    <>
      <div className="flex flex-row gap-[5vh] m-[5vh]">
        <Sidebar />
        <Navbar />
      </div>
      <div className="absolute mt-[20vh] ml-[268px] top-0 flex flex-row gap-4 overflow-x-scroll">
        {statuses?.map((status) => (
          <Status status={status} key={`status ${status.id}`} />
        ))}
      </div>
      <AnimatePresence>{newproject && <Newproject />}</AnimatePresence>
      <AnimatePresence>{edit && <EditProject />}</AnimatePresence>
      <AnimatePresence>{create && <Create />}</AnimatePresence>
      <AnimatePresence>{editstatus && <EditStatus />}</AnimatePresence>
      <AnimatePresence>{edittodo && <EditTodo />}</AnimatePresence>
      <AnimatePresence>{search && <Search />}</AnimatePresence>
    </>
  );
}
