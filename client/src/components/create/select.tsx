import { Project, Status } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface Props {
  data: Project[] | Status[];
  name: string;
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
}

function CreateSelect({ data, name, select, setSelect }: Props) {
  const [active, setActive] = useState({
    name: name[0].toUpperCase() + name.slice(1),
    id: "",
  });
  return (
    <div className="relative flex items-center">
      <input name={name} value={active.id} className="hidden" readOnly />
      <button
        type="button"
        onClick={() => setSelect((prev) => (prev === name ? "" : name))}
        className="cursor-pointer w-64 py-2 px-4 rounded bg-white border-[1px] border-stone-200 text-black text-sm text-left focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        {active.name}
      </button>
      <span className="text-stone-400 absolute right-4 text-xs">
        <FaAngleDown />
      </span>
      <AnimatePresence>
        {select === name && (
          <motion.div
            transition={{ duration: 0.1, ease: "circInOut" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 100, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-10 p-2 rounded-lg bg-white border border-stone-300 w-64 text-sm z-40 "
          >
            {data.map((item) => (
              <button
                type="button"
                key={item.id + "asd"}
                className="hover:bg-stone-300 px-10 py-1 w-full text-left rounded transition-[0.2s]"
                onClick={() => {
                  setActive({
                    name: item.name,
                    id: item.id,
                  });
                  setSelect("");
                }}
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CreateSelect;
