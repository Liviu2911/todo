import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  return (
    <>
      <h1>Here will be register</h1>
    </>
  );
}
