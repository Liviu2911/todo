import { Input } from "@/components/ui/input";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import Button from "@/components/button";
import wave from "../../public/wave_bg.svg";
import register from "../../db/register";

export const Route = createFileRoute("/register")({
  component: Register,
  validateSearch: (search: { error?: string }) => search,
});

const ValidateSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(2, { message: "Username must have at least 2 character" })
      .max(15, { message: "Username can't have more than 15 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters" })
      .refine(
        (password) => {
          return /\d/.test(password) && /[A-Z]/.test(password);
        },
        {
          message:
            "Password must include at least one symbol and one capital letter",
        }
      ),
    repassword: z.string(),
  })
  .refine(({ password, repassword }) => password === repassword, {
    message: "Passwords don't match",
  });

function Register() {
  const navigate = useNavigate();
  const { error } = Route.useSearch();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const repassword = formData.get("repassword");

    const { error } = ValidateSchema.safeParse({
      email,
      username,
      password,
      repassword,
    });

    if (error) {
      navigate({
        to: "/register",
        search: {
          error: error.errors[0].message,
        },
      });
      return;
    }

    const res = await register(email, username, password);

    if (!res.success) {
      navigate({
        to: "/register",
        search: {
          error: res.message,
        },
      });
      return;
    }

    navigate({
      to: "/",
    });
  };

  return (
    <>
      <img src={wave} alt="wave" className="absolute w-full bottom-0 z-[-1]" />
      <h1 className="text-center text-3xl mt-20">Create Account</h1>
      <form
        onSubmit={submit}
        className="mt-20 flex flex-col gap-8 items-center w-full"
      >
        <Input type="email" name="email" placeholder="email..." />
        <Input type="text" name="username" placeholder="username..." />
        <Input type="password" name="password" placeholder="password..." />
        <Input
          type="password"
          name="repassword"
          placeholder="re-enter password..."
        />

        <div className="flex flex-col gap-4 items-center">
          <Button type="submit" classname="bg-green-500">
            Sign Up
          </Button>
          <h2 className="opacity-80">or</h2>
          <Link to="/login">
            <Button classname="bg-sky-500">Log In</Button>
          </Link>
        </div>

        {error && <h1 className="text-white">{error}</h1>}
      </form>
    </>
  );
}
