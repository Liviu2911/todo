import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/nav/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import protectedLoader from "../../db/protectedLoader";
import bg from "../../public/wave_bg.svg";
import getProjects from "../../db/getProjects";

export const Route = createFileRoute("/project")({
  validateSearch: (search: { id: string; logout?: true; create?: true }) =>
    search,
  loader: protectedLoader,
  component: Project,
});

function Project() {
  const { id, logout } = Route.useSearch();
  const { data, error } = useQuery({
    queryKey: ["project"],
    queryFn: async () => (await getProjects(id ? id : "-1"))[0],
    refetchInterval: 1000,
  });
  if (error) {
    console.log(error);
    return "Error...";
  }

  if (data) {
    console.log(data);

    return (
      <>
        <img
          src={bg}
          alt="bg"
          className="absolute top-0 left-0 z-[-1] w-full"
        />
        <div className="flex gap-8">
          <Sidebar active={data.name} />
          <Navbar title={data.name} searchParams={{ logout }} path="/project" />
        </div>
      </>
    );
  }
}
