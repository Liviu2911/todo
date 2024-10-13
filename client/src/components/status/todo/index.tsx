import { Todo as Type } from "@/types";
import { createContext, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Settings from "./settings";
import { AnimatePresence } from "framer-motion";

export const TodoContext = createContext<{
  ref?: React.MutableRefObject<null>;
  id: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}>({ id: "", setShow: () => {} });

function Todo({ todo }: { todo: Type }) {
  const { name, body } = todo;
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const expires = todo.expires
    .split("T")
    .join(" ")
    .slice(0, todo.expires.length - 8);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // @ts-expect-error aaa
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    if (show) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [show]);

  return (
    <div className="p-4 bg-stone-700 border border-stone-200 rounded-lg w-72 relative">
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-white opacity-80">{name}</h1>

          <div className="relative">
            <button
              onClick={() => setShow(true)}
              className="text-white opacity-80 hover:oapcity-100 hover:text-rose-500 transition-all"
            >
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>
        <p className="text-sm text-white">{body}</p>
        <AnimatePresence>
          {show && (
            <TodoContext.Provider value={{ ref, id: todo.id, setShow }}>
              <Settings />
            </TodoContext.Provider>
          )}
        </AnimatePresence>
      </div>

      <h1 className="text-white italic absolute bottom-[-20px] text-xs opacity-80">
        Expires on{" "}
        <span className="text-rose-500 font-semibold">{expires}</span>
      </h1>
    </div>
  );
}

export default Todo;
