import { Link } from "@tanstack/react-router";
import { FaPlus } from "react-icons/fa6";

function NewTodo() {
  const path = window.location.pathname;

  return (
    <div className="relative">
      <Link
        to={path}
        search={(prev) => ({
          id: prev.id,
          create: prev.create ? undefined : true,
        })}
      >
        <div className="p-2 bg-white hover:opacity-80 hover:text-rose-500 transition-all rounded-full">
          <FaPlus />
        </div>
      </Link>
    </div>
  );
}

export default NewTodo;
