import Form from "@/components/form";
import FormInput from "@/components/form/forminput";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <>
      <h1 className="text-center text-white font-semibold text-2xl mt-20">
        Log In
      </h1>
      <Form>
        <FormInput name="email" />
        <FormInput name="password" />
        <Button
          type="submit"
          className="bg-green-500 text-white max-w-max px-8 hover:bg-green-500 hover:text-white hover:opacity-90 transition-all"
        >
          Log In
        </Button>
        <span className="flex items-center gap-2 text-white">
          or
          <Link
            to="/register"
            className="text-sm text-stone-200 hover:text-white hover:underline"
          >
            Register
          </Link>
        </span>
      </Form>
    </>
  );
}
