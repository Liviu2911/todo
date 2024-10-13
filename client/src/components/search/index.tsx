import { useContext, useEffect, useRef, useState } from "react";
import { Data, Path, SearchParamsContext } from "@/routes/__root";
import { useNavigate } from "@tanstack/react-router";
import { IoSearch } from "react-icons/io5";
import Modal from "../modal";
import Result from "./result";
import { Project, Status, Todo as Type } from "@/types";
import Todo from "../todo";

function Search() {
  const path = useContext(Path);
  const { search, todo: todoid } = useContext(SearchParamsContext);
  const { projects } = useContext(Data);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [results, setResults] = useState<
    { todo: Type; status: Status; project: Project }[]
  >([]);
  useEffect(() => {
    setResults([]);
    const findTodos = () => {
      for (let i = 0; i < projects.length && input !== ""; i++) {
        const statuses = projects[i].statuses;
        for (let j = 0; j < statuses.length; j++) {
          const todos = statuses[j].todos;
          for (let k = 0; k < todos.length; k++) {
            if (
              todos[k].name
                .toLocaleLowerCase()
                .includes(input.toLocaleLowerCase())
            )
              setResults((prev) => [
                ...prev,
                { todo: todos[k], status: statuses[j], project: projects[i] },
              ]);
          }
        }
      }
    };
    findTodos();
  }, [input, projects]);

  const todoRef = useRef(null);

  return (
    <>
      <Modal
        ref2={todoRef}
        show2={todoid}
        show={search ? true : false}
        close={() =>
          navigate({
            to: path,
            search: (prev) => ({ ...prev, search: undefined }),
          })
        }
        classname="absolute top-20"
      >
        <div className="flex flex-col gap-2 w-96">
          <div className="flex items-center justify-between">
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="outline-none border-none text-lg py-1 pl-4 pr-20"
              placeholder="Search todo name..."
            />
            <button
              type="button"
              className="text-xl opacity-80 hover:opacity-100 hover:text-rose-500 transition-all"
            >
              <IoSearch />
            </button>
          </div>
          {results.length > 0 && (
            <div className="w-full bg-white rounded-b-lg flex flex-col gap-2">
              <div className="flex flex-row justify-around text-black opacity-50">
                <h1 className="w-32 text-center">Todo</h1>
                <h1 className="w-32 text-center">Status</h1>
                <h1 className="w-32 text-center">Project</h1>
              </div>
              {results.map((result) => (
                <Result
                  todo={result.todo}
                  status={result.status}
                  project={result.project}
                  key={`result${result.todo.id}`}
                />
              ))}
            </div>
          )}
        </div>
      </Modal>
      {todoid && (
        <Todo
          ref={todoRef}
          todo={results.filter((res) => res.todo.id === todoid)[0].todo}
        />
      )}
    </>
  );
}

export default Search;
