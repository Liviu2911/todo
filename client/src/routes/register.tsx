import Form from "@/components/form";
import FormInput from "@/components/form/forminput";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  return (
    <>
      <h1 className="text-center mt-20 text-white text-2xl font-semibold">
        Create New Account
      </h1>
      <Form>
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
