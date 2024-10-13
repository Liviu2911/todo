import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { Data, SearchParamsContext } from "./__root";
import { sortByDate } from "@/sortbydate";
import { Todo as TodoType } from "@/types";
import Newproject from "@/components/newproject";
import Todo from "@/components/status/todo";
import Search from "@/components/search";
import Create from "@/components/create";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar/index";
import EditTodo from "@/components/edittodo";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { newproject, search, create, edittodo } =
    useContext(SearchParamsContext);
  const { projects } = useContext(Data);
  const allTodos: TodoType[] = [];
  for (let i = 0; i < projects.length; i++) {
    const statuses = projects[i].statuses;
    for (let j = 0; j < statuses.length; j++) {
      const todos = statuses[j].todos;
      for (let k = 0; k < todos.length; k++) allTodos.push(todos[k]);
    }
  }
  sortByDate(allTodos);
  return (
    <>
      <div className="flex flex-row m-[5vh] gap-[5vh]">
        <Sidebar />
        <Navbar />
      </div>
      {newproject && <Newproject />}

      <div className="absolute top-44 left-[278px]">
        <h1 className="text-white text-lg font-semibold">
          Todos that are about to expire
        </h1>
        <div className="grid grid-cols-4 gap-8 mt-4">
          {allTodos.map(
            (todo, i) => i < 4 && <Todo todo={todo} key={`todo${todo.id}`} />
          )}
        </div>
      </div>

      <AnimatePresence>{search && <Search />}</AnimatePresence>
      <AnimatePresence>{create && <Create />}</AnimatePresence>
      <AnimatePresence>{edittodo && <EditTodo />}</AnimatePresence>
    </>
  );
}
