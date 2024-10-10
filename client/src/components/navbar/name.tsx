import { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { popup } from "@/animations";
import { Data, SearchParamsContext } from "@/routes/__root";
import { Link, useNavigate } from "@tanstack/react-router";

function Name({ name }: { name: string }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { id } = useContext(SearchParamsContext);
  const { userId: userid } = useContext(Data);
  const ref = useRef(null);
  const handleClick = (e: MouseEvent) => {
    // @ts-expect-error aaa
    if (ref.current && !ref.current.contains(e.target)) {
      setShow(false);
    }
  };

  const deleteProject = async () => {
    const res = await fetch("http://localhost:3000/api/v1/todo/projects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userid }),
    });
    const json = await res.json();

    if (!json.success) {
      console.log(json.error);
      return;
    }
    navigate({
      to: "/dashboard",
    });
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
    <div className="flex flex-row items-center gap-2">
      <h1 className="text-white">
        {name === "dashboard" ? "Dashboard" : name}
      </h1>
      {name !== "dashboard" && (
        <div className="relative">
          <button
            onClick={() => setShow(true)}
            className="text-sm text-white hover:text-rose-500 transition-[0.2s]"
          >
            <BsThreeDotsVertical />
          </button>

          <AnimatePresence>
            {show && (
              <motion.div
                ref={ref}
                transition={popup.transition}
                initial={popup.initial}
                animate={popup.animate}
                exit={popup.initial}
                className="p-3 bg-white rounded flex flex-col absolute top-8"
              >
                <Link
                  to="/project"
                  search={(prev) => ({ ...prev, edit: true })}
                  className="pr-10 pl-1.5 py-1.5 hover:bg-stone-200 text-sm rounded text-left transition-[0.2s]"
                >
                  Edit
                </Link>

                <button
                  onClick={deleteProject}
                  className="pr-10 pl-1.5 py-1.5 hover:bg-stone-200 text-sm rounded text-left transition-[0.2s]"
                >
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Name;
