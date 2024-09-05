const login = async (email: string, password: string) => {
  const res = await fetch("http://localhost:3000/api/v1/todo/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();

  return json;
};

export default login;
