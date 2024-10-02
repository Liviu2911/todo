import { SearchParamsContext } from "@/routes/__root";
import { Link, useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { FaUserAstronaut } from "react-icons/fa";

function Pfp() {
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
  const { logout: show } = useContext(SearchParamsContext);
  const path = window.location.pathname;

  return (
    <div className="relative">
      <Link
        to={path}
        search={(prev) => ({
          id: prev.id,
          logout: prev.logout ? undefined : true,
        })}
      >
        <div className="p-2 bg-white rounded-full hover:text-red-500 hover:opacity-80 transition-all">
          <FaUserAstronaut />
        </div>
      </Link>
      {show && (
        <form onSubmit={logout}>
          <button
            type="submit"
            className="absolute top-10 left-[-20px] px-3 py-1 bg-white text-black hover:text-rose-500 transition-all rounded w-20 text-sm"
          >
            Log out
          </button>
        </form>
      )}
    </div>
  );
}

export default Pfp;
