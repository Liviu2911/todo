const register = async (email: string, username: string, password: string) => {
  const res = await fetch("http://localhost:3000/api/v1/todo/register", {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) {
    return json;
  }

  const loginRes = await fetch("http://localhost:3000/api/v1/todo/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const loginJson = await loginRes.json();
  return loginJson;
};

export default register;
