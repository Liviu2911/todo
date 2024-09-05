import { SiGoogleanalytics } from "react-icons/si";
import { FaGear } from "react-icons/fa6";
import { Link } from "@tanstack/react-router";

interface Props {
  active: string;
}

function Sidebar({ active }: Props) {
  return (
    <>
      <div className="absolute z-[-1] top-[3vh] left-8 bg-stone-700 blur-sm h-[94vh] w-48 rounded-lg"></div>
      <div className="w-48 bg-stone-950 h-[94vh] m-[3vh] rounded-lg flex flex-col items-center py-4 border border-stone-700">
        <div className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className={`flex flex-row gap-2 items-center ${active === "dashboard" ? "opacity-100" : "opacity-80"} hover:opacity-100 t3`}
          >
            <SiGoogleanalytics />
            Dashboard
          </Link>

          <Link
            to="/settings"
            className={`flex flex-row gap-2 items-center ${active === "settings" ? "opacity-100" : "opacity-80"} hover:opacity-100 t3`}
          >
            <FaGear />
            Settings
          </Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
