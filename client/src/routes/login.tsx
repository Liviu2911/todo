import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import Button from "@/components/button";
import wave from "../../public/wave.svg";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <>
      <img src={wave} alt="wave" className="w-full absolute bottom-0 z-[-1]" />
      <h1 className="text-center text-3xl mt-20">Login</h1>
      <form className="w-full flex flex-col gap-8 items-center mt-20">
        <Input name="email" type="email" placeholder="email..." />
        <Input name="password" type="password" placeholder="password..." />

        <div className="flex flex-col gap-4 items-center">
          <Button type="submit" classname="bg-sky-500">
            Log In
          </Button>
          <h2 className="opacity-80">or</h2>
          <Link to="/register">
            <Button classname="bg-green-500">Register</Button>
          </Link>
        </div>
      </form>
    </>
  );
}
