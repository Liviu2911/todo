import { Link } from "@tanstack/react-router";
import { MdSearch } from "react-icons/md";

function SearchNavButton() {
  return (
    <Link className="size-10 rounded-full bg-blue-300 flex items-center justify-center text-2xl hover:bg-blue-400 t3">
      <MdSearch />
    </Link>
  );
}

export default SearchNavButton;
