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
  const { name, expires } = todo;
  const [show, setShow] = useState(false);
  const ref = useRef(null);

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
      <div className="flex flex-row justify-between">
        <h1 className="text-white">{name}</h1>

        <div className="relative">
          <button
            onClick={() => setShow(true)}
            className="text-white opacity-80 hover:oapcity-100 hover:text-rose-500 transition-all"
          >
            <BsThreeDotsVertical />
          </button>
        </div>
        <AnimatePresence>
          {show && (
            <TodoContext.Provider value={{ ref, id: todo.id, setShow }}>
              <Settings />
            </TodoContext.Provider>
          )}
        </AnimatePresence>
      </div>

      <h1 className="text-white italic absolute bottom-[-20px] text-xs opacity-80">
        Expires on {expires}
      </h1>
    </div>
  );
}

export default Todo;
