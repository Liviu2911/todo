import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { modal } from "@/animations";

interface Props {
  children: React.ReactNode;
  show: boolean;
  close: () => void;
  classname?: string;
  ref2?: React.MutableRefObject<null>;
  show2?: string;
}

function Modal({ children, show, close, classname, ref2, show2 }: Props) {
  const ref = useRef(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref2 || !show2) {
        // @ts-expect-error aaa
        if (ref && ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
    };
    if (show) document.addEventListener("mousedown", handleClick);
    else document.removeEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [show, close, ref2, show2]);
  return (
    <motion.div
      className={`absolute left-0 top-0 w-full h-[100vh] z-50 bg-black bg-opacity-30 flex items-center justify-center`}
      transition={modal.transition}
      initial={modal.initial}
      animate={modal.animate}
      exit={modal.initial}
    >
      <div ref={ref} className={` ${classname} p-4 bg-white rounded-lg`}>
        {children}
      </div>
    </motion.div>
  );
}

export default Modal;
