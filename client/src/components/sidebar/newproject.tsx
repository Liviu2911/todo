import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

function NewProject() {
  const path = window.location.pathname;
  return (
    <Link
      to={path}
      search={(prev) => ({
        id: prev.id,
        newproject: prev.newproject ? undefined : true,
      })}
    >
      <Button className="bg-rose-500 hover:bg-rose-500 hover:opacity-80 transition-all absolute bottom-8">
        New Project
      </Button>
    </Link>
  );
}

export default NewProject;
