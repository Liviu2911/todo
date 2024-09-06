import { Link } from "@tanstack/react-router";
import { IoMdAdd } from "react-icons/io";

function NewTodoButton() {
  return (
    <Link className="size-10 rounded-full bg-blue-300 flex items-center justify-center text-2xl hover:bg-blue-400 t3">
      <IoMdAdd />
    </Link>
  );
}

export default NewTodoButton;
