import { redirect } from "@tanstack/react-router";

const loader = async () => {
  const res = await fetch("http://localhost:3000/api/v1/todo/session", {
    method: "GET",
    credentials: "include",
  });

  const json = await res.json();

  if (!json.success) {
    return redirect({
      to: "/login",
    });
  }

  return json;
};

export default loader;
