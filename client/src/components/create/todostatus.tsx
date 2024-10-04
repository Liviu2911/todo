import { motion } from "framer-motion";
import { useContext } from "react";
import { CreateFunctions } from ".";

function SelectTodoStatus() {
  const { active, setActive } = useContext(CreateFunctions);
  return (
    <div className="flex flex-row gap-2 relative bg-rose-300 text-white rounded h-6 max-w-64">
      <motion.div
        transition={{ ease: "circInOut", duration: 0.3 }}
        initial={{ x: active === "todo" ? 0 : 100 }}
        animate={{ x: active === "todo" ? 0 : 100 }}
        className="w-20 h-6 rounded bg-rose-500 absolute z-20"
      ></motion.div>
      <button
        type="button"
        className="w-20 z-30"
        onClick={() => setActive("todo")}
      >
        Todo
      </button>
      |
      <button
        type="button"
        className="w-20 z-30"
        onClick={() => setActive("status")}
      >
        Status
      </button>
    </div>
  );
}

export default SelectTodoStatus;
