import { Link } from "@tanstack/react-router";

function Dashboard() {
  const path = window.location.pathname.slice(1);
  return (
    <div className="flex flex-col items-center">
      <Link
        to="/dashboard"
        className={`text-white ${path === "dashboard" ? "opacity-100" : "opacity-80 hover:opacity-100 transition-all"}`}
      >
        Dashboard
      </Link>
      <div className="w-full h-[2px] rounded-full bg-white opacity-80 m-2" />
    </div>
  );
}

export default Dashboard;
