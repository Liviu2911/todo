import { createFileRoute, Link } from "@tanstack/react-router";
import { useContext } from "react";
import { Data } from "./__root";
import wave from "../assets/Stacked Waves Haikei.svg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const data = useContext(Data);
  console.log(data);
  return (
    <>
      <img
        alt="Background"
        src={wave}
        className="absolute top-0 left-0 w-full z-[-1]"
      />
      <h1 className="text-white font-semibold text-center text-2xl mt-32">
        Discover the best, and most over-engineered, todo app
      </h1>

      <div className="flex flex-col w-full items-center gap-4 mt-10 font-semibold">
        <h1 className="text-rose-500 text-xl">
          {data.session
            ? "Go to dashboard and explore"
            : "Login to explore the not so endless possibilities"}
        </h1>
        <Link to={data.session ? "/dashboard" : "/login"}>
          <Button className="hover:opacity-80 transition-opacity bg-white text-black hover:bg-white font-medium px-5">
            {data.session ? "Dashboard" : "Log In"}
          </Button>
        </Link>
      </div>
    </>
  );
}
