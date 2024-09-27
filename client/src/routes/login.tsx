import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <>
      <h1>Here will be login</h1>
    </>
  );
}
