// import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import "../../index.css";

interface Props {
  children: React.ReactNode;
}

const transition = {
  duration: 0.3,
  ease: "linear",
};

function ModalBackground({ children }: Props) {
  //   const navigate = useNavigate();
  const close = () => {
    // navigate({
    //   to: "/project",
    //   search: (prev) => ({ ...prev, create: undefined, id: prev.id! }),
    // });
  };
  return (
    <motion.div
      transition={transition}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="absolute top-0 left-0 w-full h-[100vh] z-10 flex items-center justify-center"
    >
      {children}
      <div
        className="absolute left-0 top-0 w-full h-[100vh] bg-black bg-opacity-40 z-[-10]"
        onClick={close}
      ></div>
    </motion.div>
  );
}

export default ModalBackground;
