import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import SidebarUp from "./sidebarup";
import getProjects from "../../../db/getProjects";

interface Props {
  active: string;
}

function Sidebar({ active }: Props) {
  const { data, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getProjects(),
  });

  if (error) {
    console.log(error);
    return "error...";
  }
  if (data) {
    return (
      <>
        <div className="w-48 bg-blue-500 h-[94vh] mt-[3vh] rounded-lg flex flex-col items-center py-4 px-4 border border-sky-200 sticky">
          <SidebarUp active={active} />
          <div className="flex flex-col items-start">
            {data.map((project: { name: string; id: string }) => (
              <Link
                to={"/project"}
                search={{ id: project.id }}
                key={`project + ${project.id}`}
                className={
                  active !== project.name
                    ? "opacity-80 hover:opacity-100 t3"
                    : "opacity-100"
                }
              >
                {project.name}
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Sidebar;
