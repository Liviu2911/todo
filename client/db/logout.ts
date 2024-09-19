export default async function logout() {
  const res = await fetch("http://localhost:3000/api/v1/todo/logout", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}
