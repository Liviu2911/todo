import { Status as Type } from "@/types";
import Todo from "./todo";
import { Link } from "@tanstack/react-router";

function Status({ status }: { status: Type }) {
  return (
    <div className="flex flex-col gap-4 items-start h-[95vh] w-[400px] overflow-y-scroll">
      <Link
        to="/project"
        search={(prev) => ({ ...prev, editstatus: status.id })}
        className="text-rose-500 font-semibold w-72 text-center"
      >
        {status.name}
      </Link>
      {status.todos.map((todo) => (
        <Todo todo={todo} key={`todo ${todo.id}`} />
      ))}
    </div>
  );
}

export default Status;
