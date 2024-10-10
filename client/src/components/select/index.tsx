import { Project, Status } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { popup } from "@/animations";
import Option from "./option";
import * as React from "react";

interface Props {
  name: string;
  data: (Project & { projectid?: string })[] | Status[];
  setProjectid?: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectData = createContext<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShow: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProjectid: any;
}>({
  setValue: null,
  setShow: null,
  setProjectid: null,
});
function Select({ name, data, setProjectid }: Props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState({
    id: "-1",
    name,
  });
  const ref = useRef(null);
  const handleClick = (e: MouseEvent) => {
    // @ts-expect-error Because ts says that ref is of type never
    if (ref.current && !ref.current.contains(e.target)) {
      setShow(false);
    }
  };
  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [show]);
  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        name={name}
        value={value.id}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => setShow(true)}
        className="flex items-center justify-between w-64 rounded bg-white border border-stone-200 px-4 py-2"
      >
        {value.name}
        <FaAngleDown />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            transition={popup.transition}
            initial={popup.initial}
            animate={popup.animate}
            exit={popup.initial}
            className="bg-white rounded-lg p-2 w-64 absolute top-12 z-30 border border-stone-200"
            ref={ref}
          >
            {data.map((item) => (
              <SelectData.Provider
                value={{
                  setValue,
                  setProjectid,
                  setShow,
                }}
                key={`item ${item.id}`}
              >
                <Option id={item.id} name={item.name} />
              </SelectData.Provider>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Select;
