import { redirect } from "@tanstack/react-router";

export default async function protectedLoader() {
  const res = await fetch("http://localhost:3000/api/v1/todo/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();

  console.log(json);
  if (!json.session) {
    return redirect({
      to: "/login",
    });
  }
}
