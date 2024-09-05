const getSession = async () => {
  const res = await fetch("http://localhost:3000/api/v1/todo/session", {
    method: "GET",
    credentials: "include",
  });

  const json = await res.json();

  return json;
};

export default getSession;
