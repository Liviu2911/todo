import { Link } from "@tanstack/react-router";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

function DashboardAndSettings() {
  const path = window.location.pathname;
  return (
    <div className="flex flex-col items-start text-white relative">
      <Link
        to="/dashboard"
        className={`flex flex-row items-center gap-2 ${
          path === "/dashboard"
            ? "opacity-100"
            : "opacity-80 hover:opacity-100 transition-all"
        }`}
      >
        <TbBrandGoogleAnalytics />
        Dashboard
      </Link>
      <Link
        to="/dashboard"
        className={`flex flex-row items-center gap-2 ${
          path === "/settings"
            ? "opacity-100"
            : "opacity-80 hover:opacity-100 transition-all"
        }`}
      >
        <IoSettingsOutline />
        Settings
      </Link>
      <div className="w-full h-[2px] bg-stone-300 rounded-full mt-4 mb-4" />
    </div>
  );
}

export default DashboardAndSettings;
