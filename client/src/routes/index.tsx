import { createFileRoute, Link } from "@tanstack/react-router";
import bg from "../../public/wave_bg.svg";
import Button from "@/components/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <img src={bg} alt="bg" className="w-full absolute z-[-1] bottom-0 " />
      <img
        src={bg}
        alt="bg"
        className="w-full absolute z-[-1] top-[-100px] rotate-180"
      />
      <h1 className="text-center text-6xl mt-20">
        This is <span className="font-bold text-sky-300">theTodo</span>
      </h1>

      <div className="w-full h-[100vh] absolute top-96 left-0 flex flex-col gap-4 items-center">
        <h1 className="text-4xl">
          Go to dashboard to create your useless todos
        </h1>
        <Link to={"/dashboard"}>
          <Button classname="bg-sky-500 shadow-md shadow-sky-600">
            Dashboard
          </Button>
        </Link>
      </div>
    </>
  );
}
