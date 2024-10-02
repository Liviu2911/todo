import { Data, SearchParamsContext } from "@/routes/__root";
import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "@tanstack/react-router";
import Pfp from "./pfp";
import NewTodo from "./newtodo";
import Search from "./search";

function Navbar() {
  const navigate = useNavigate();
  const { projects, userId } = useContext(Data);
  const { settings, id } = useContext(SearchParamsContext);
  const path = window.location.pathname;
  let name = "";
  if (path.includes("project")) {
    name = projects.filter((project) => project.id === id)[0]?.name;
  } else name = path.slice(1);

  const deleteProject = async () => {
    const res = await fetch("http://localhost:3000/api/v1/todo/projects", {
      method: "DELETE",
      body: JSON.stringify({ id, userid: userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (json.success) {
      navigate({
        to: "/dashboard",
      });
    }
  };

  return (
    <nav className="rounded-lg border border-stone-300 bg-stone-800 flex items-center justify-between p-8 max-h-24 w-[100%]">
      <div className="flex flex-row items-center gap-2 relative">
        <h1 className="text-white">
          {name === "dashboard" ? "Dashboard" : name}
        </h1>
        {path !== "/dashboard" && (
          <Link
            to={"/project"}
            search={(prev) => ({
              id: prev.id,
              settings: prev.settings ? undefined : true,
            })}
            className="text-white opacity-80 hover:opacity-100 transition-all"
          >
            <BsThreeDotsVertical />
          </Link>
        )}
        {settings && (
          <div className="flex flex-col items-start gap-2 px-4 py-2 rounded bg-white absolute top-8 right-[-30px]">
            <Link
              to="/project"
              search={(prev) => ({ ...prev, editid: id })}
              className="opacity-80 hover:opacity-100 transition-all"
            >
              Edit
            </Link>
            <button
              onClick={deleteProject}
              className="opacity-80 hover:opacity-100 transition-all hover:text-red-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-4">
        <Search />
        <NewTodo />
        <Pfp />
      </div>
    </nav>
  );
}

export default Navbar;
