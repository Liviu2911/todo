import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { popup } from "@/animations";

function Pfp() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  async function logout() {
    const res = await fetch("http://localhost:3000/api/v1/todo/logout", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (json.success) {
      navigate({
        to: "/login",
      });
      return;
    }
  }
  const handleClick = (e: MouseEvent) => {
    // @ts-expect-error aaa
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
      <button
        onClick={() => setShow(true)}
        className="p-2 bg-white rounded-full hover:opacity-80 hover:text-rose-500 transition-all"
      >
        <FaUserAstronaut />
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            ref={ref}
            transition={popup.transition}
            initial={popup.initial}
            animate={popup.animate}
            exit={popup.initial}
            className="absolute top-10 left-[-22px] p-1 bg-white text-black rounded text-sm flex items-center justify-center"
          >
            <form onSubmit={logout}>
              <button
                type="submit"
                className="p-1.5 hover:bg-stone-200 rounded outline-none transition-[0.2s] min-w-16"
              >
                Log out
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Pfp;
