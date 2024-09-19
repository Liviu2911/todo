export default async function getProjects(id?: string) {
  const res = await fetch("http://localhost:3000/api/v1/todo/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });

  const json = await res.json();

  return json.projects;
}
