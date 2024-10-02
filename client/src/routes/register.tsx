import Form from "@/components/form";
import FormInput from "@/components/form/forminput";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/register")({
  component: Register,
  validateSearch: (search: { error?: string }) => search,
});

const schema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(15, { message: "Username can't be longer than 15 characters" }),
    repassword: z.string(),
  })
  .refine(({ password, repassword }) => password === repassword, {
    message: "Passwords don't match",
  });

function Register() {
  const navigate = useNavigate();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const repassword = formData.get("repassword");

    const { error } = schema.safeParse({
      email,
      password,
      username,
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

    const res = await fetch("http://localhost:3000/api/v1/todo/register", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();

    if (json.success) {
      navigate({
        to: "/dashboard",
      });
      return;
    }

    navigate({
      to: "/register",
      search: { error: json.error },
    });
  }
  return (
    <>
      <h1 className="text-center mt-20 text-white text-2xl font-semibold">
        Create New Account
      </h1>
      <Form onSubmit={submit}>
        <FormInput name="email" />
        <FormInput name="username" />
        <FormInput name="password" />
        <FormInput name="repassword" />
        <Button
          type="submit"
          className="px-8 bg-green-500 text-white hover:text-white hover:bg-green-500 hover:opacity-90 transition-all"
        >
          Register
        </Button>
        <span className="flex items-center gap-2 text-white">
          or
          <Link
            to="/login"
            className="text-stone-200 text-sm hover:text-white hover:underline"
          >
            Login
          </Link>
        </span>
      </Form>
    </>
  );
}
