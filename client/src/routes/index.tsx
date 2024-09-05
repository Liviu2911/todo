import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import bg from "../../public/wave.svg";
import getSession from "../../db/getSession";
import Button from "@/components/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: session, error } = useQuery({
    queryKey: ["Session"],
    queryFn: getSession,
  });
  if (error) {
    console.log(error);
  }
  return (
    <>
      <img src={bg} alt="bg" className="w-full absolute z-[-1] bottom-0 " />
      <img
        src={bg}
        alt="bg"
        className="w-full absolute z-[-1] top-[-100px] rotate-180"
      />
      <h1 className="text-center text-5xl mt-20">
        This is <span className="font-bold text-sky-300">theTodo</span>
      </h1>

      <div className="w-full h-[100vh] absolute top-96 left-0 flex flex-col gap-4 items-center">
        <h1 className="text-2xl">
          {session
            ? "Go to dashboard to create your useless todos"
            : "Log in right now create your useless todos"}
        </h1>
        <Link to={session ? "/dashboard" : "/login"}>
          <Button classname="bg-sky-500">
            {session ? "Dashboard" : "Log In"}
          </Button>
        </Link>
      </div>
    </>
  );
}
