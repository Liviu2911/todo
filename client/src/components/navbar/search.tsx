import { Link } from "@tanstack/react-router";
import { IoSearch } from "react-icons/io5";

function Search() {
  const path = window.location.pathname;

  return (
    <div className="relative">
      <Link
        to={path}
        search={(prev) => ({
          id: prev.id,
          search: prev.search ? undefined : true,
        })}
      >
        <div className="p-2 bg-white hover:opacity-80 hover:text-rose-500 transition-all rounded-full">
          <IoSearch />
        </div>
      </Link>
    </div>
  );
}

export default Search;
