import { Input } from "@/components/ui/input";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import Button from "@/components/button";
import wave from "../../public/wave_bg.svg";
import login from "../../db/login";

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: (search: { error?: string }) => search,
});

function Login() {
  const navigate = useNavigate();
  const { error } = Route.useSearch();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const loginRes = await login(email, password);
    if (loginRes.success) {
      navigate({
        to: "/dashboard",
      });
      return;
    }

    console.log(loginRes.error);
    navigate({
      to: "/login",
      search: {
        error: loginRes.error,
      },
    });
  };
  return (
    <>
      <img src={wave} alt="wave" className="w-full absolute bottom-0 z-[-1]" />
      <h1 className="text-center text-3xl mt-20">Login</h1>
      <form
        onSubmit={submit}
        className="w-full flex flex-col gap-8 items-center mt-20"
      >
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
        {error && <h1 className="text-rose-500">{error}</h1>}
      </form>
    </>
  );
}
