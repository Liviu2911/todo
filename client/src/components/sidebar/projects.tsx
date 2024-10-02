import { Data } from "@/routes/__root";
import { Project } from "@/types";
import { Link } from "@tanstack/react-router";
import { useContext } from "react";

function Projects() {
  const { projects } = useContext(Data);
  return (
    <div className="flex flex-col gap-2">
      {projects?.map((project: Project) => (
        <Link
          key={project.id}
          to="/project"
          search={{
            id: project.id,
          }}
          className={`text-white opacity-80 hover:opacity-100 transition-all`}
        >
          {project.name}
        </Link>
      ))}
    </div>
  );
}

export default Projects;
