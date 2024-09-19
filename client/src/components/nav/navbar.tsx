import { DashboardSearch } from "@/routes/dashboard";
import ProfilePic from "./pfp";
import NewTodoButton from "./newtodo";
import SearchNavButton from "./search";

interface Props {
  title: string;
  searchParams: DashboardSearch;
  path: string;
}

function Navbar({ title, searchParams, path }: Props) {
  const { logout } = searchParams;
  return (
    <nav
      className={`w-full bg-blue-500 h-24 rounded-lg mt-[3vh] border border-sky-200 flex flex-row items-center justify-between px-6`}
    >
      <h1 className="text-stone-200 text-xl">{title}</h1>

      <div className="flex flex-row items-center gap-4">
        <SearchNavButton />
        <NewTodoButton />
        <ProfilePic logout={logout} path={path} />
      </div>
    </nav>
  );
}

export default Navbar;
