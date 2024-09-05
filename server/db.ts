import { Pool } from "pg";

const auth = new Pool({
  database: "auth",
  port: 5432,
  user: "liviu",
  password: "password",
  host: "localhost",
});

const api = new Pool({
  database: "todos_api",
  port: 5432,
  user: "liviu",
  password: "password",
  host: "localhost",
});

export { auth, api };
