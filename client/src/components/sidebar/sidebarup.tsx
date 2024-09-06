import { SiGoogleanalytics } from "react-icons/si";
import { FaGear } from "react-icons/fa6";
import { Link } from "@tanstack/react-router";

function SidebarUp({ active }: { active: string }) {
  return (
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

      <div className="w-[90%] h-[2px] bg-blue-200 rounded-full mt-2" />
    </div>
  );
}

export default SidebarUp;
