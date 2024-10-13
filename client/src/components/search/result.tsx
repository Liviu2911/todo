import { Path } from "@/routes/__root";
import { Project, Status, Todo as Type } from "@/types";
import { Link } from "@tanstack/react-router";
import { useContext } from "react";

interface Props {
  todo: Type;
  project: Project;
  status: Status;
}

function Result({ todo, status, project }: Props) {
  const path = useContext(Path);
  return (
    <>
      <Link
        to={path}
        search={(prev) => ({ ...prev, todo: todo.id })}
        className="flex flex-row justify-around hover:bg-stone-200 rounded-lg p-1"
      >
        <h1 className="w-32 text-center">{todo.name}</h1>
        <h1 className="w-32 text-center">{status.name}</h1>
        <h1 className="w-32 text-center">{project.name}</h1>
      </Link>
    </>
  );
}

export default Result;
