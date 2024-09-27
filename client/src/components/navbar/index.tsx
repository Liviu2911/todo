import { Data } from "@/routes/__root";
import { useContext } from "react";
import Pfp from "./pfp";
import NewTodo from "./newtodo";
import Search from "./search";

function Navbar({ id }: { id?: string }) {
  const { projects } = useContext(Data);
  const path = window.location.pathname;
  let name = "";
  if (path.includes("project")) {
    name = projects.filter((project) => project.id === id)[0].name;
  } else name = path.slice(1);

  return (
    <nav className="rounded-lg border border-stone-300 bg-stone-800 flex items-center justify-between p-8 max-h-24 w-[100%]">
      <h1 className="capitalize text-white">{name}</h1>
      <div className="flex flex-row items-center gap-4">
        <Search />
        <NewTodo />
        <Pfp />
      </div>
    </nav>
  );
}

export default Navbar;
