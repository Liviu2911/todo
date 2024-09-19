import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../button";
import logoutFunc from "../../../db/logout";

const avatar = (name: string) =>
  createAvatar(lorelei, {
    seed: name,
    backgroundColor: ["ff4040"],
    hairColor: ["000"],
    eyesColor: ["233D4D"],
    skinColor: ["ffe19f"],
    mouthColor: ["000"],
    glasses: [],
    eyebrows: ["variant10"],
    hair: ["variant04"],
  }).toDataUri();

interface Props {
  logout?: true;
  path: string;
}

function ProfilePic({ logout, path }: Props) {
  return (
    <div className="relative flex flex-col items-center">
      <Link
        to={path}
        search={(prev) => ({ ...prev, logout: logout ? undefined : true })}
        className="size-10 rounded-full bg-stone-200 flex items-center justify-center overflow-hidden hover:opacity-80 t3"
      >
        <img src={avatar(localStorage.getItem("user") || "")} alt="pfp" />
      </Link>

      <AnimatePresence>
        {logout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3, ease: "linear" },
            }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: "linear" } }}
            className="relative flex items-center justify-center"
          >
            <Button
              onClick={logoutFunc}
              classname="absolute bottom-[-40px] bg-rose-500 text-sm flex flex-row items-center gap-2"
            >
              Logout
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfilePic;
