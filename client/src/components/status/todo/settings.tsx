import { useContext } from "react";
import { TodoContext } from ".";
import { motion } from "framer-motion";
import { popup } from "@/animations";
import { Data } from "@/routes/__root";
import { Link } from "@tanstack/react-router";

function Settings() {
  const { ref, id, setShow } = useContext(TodoContext);
  const { userId: userid } = useContext(Data);

  const deleteTodo = async () => {
    const res = await fetch("http://localhost:3000/api/v1/todo/todos", {
      method: "DELETE",
      body: JSON.stringify({ id, userid }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!json.success) {
      console.log(json.error);
      return;
    }
  };

  return (
    <motion.div
      transition={popup.transition}
      initial={popup.initial}
      animate={popup.animate}
      exit={popup.initial}
      ref={ref}
      className="p-3 bg-white absolute top-10 right-[-90px] rounded flex flex-col z-30 text-sm"
    >
      <Link
        to="/project"
        search={(prev) => ({ ...prev, edittodo: id })}
        className="pr-10 pl-1.5 py-1.5 hover:bg-stone-200 transition-[0.2s] rounded w-24 text-left"
        onClick={() => setShow(false)}
      >
        Edit
      </Link>
      <button
        onClick={deleteTodo}
        className="pr-10 pl-1.5 py-1.5 hover:bg-stone-200 transition-[0.2s] rounded w-24 text-left"
      >
        Delete
      </button>
    </motion.div>
  );
}

export default Settings;
