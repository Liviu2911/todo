import { motion, AnimatePresence } from "framer-motion";

interface Props {
  active: boolean;
  setActive: (val: boolean) => void;
}

function Select({ active, setActive }: Props) {
  const transition = {
    duration: 0.1,
    ease: "linear",
  };
  return (
    <div className="px-3 py-1 max-w-52 bg-stone-700 rounded-sm flex flex-row gap-4 text-white text-sm relative">
      <button className="z-20 w-[75px]" onClick={() => setActive(false)}>
        New Todo
      </button>
      <p className="z-20">|</p>
      <button className="z-20 w-[75px]" onClick={() => setActive(true)}>
        New Status
      </button>
      <AnimatePresence initial>
        <motion.div
          transition={transition}
          animate={{ x: active ? 105 : 0 }}
          className="absolute top-0 left-0 w-[50%] h-full bg-sky-500 rounded-sm z-[10] t3"
        ></motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Select;
