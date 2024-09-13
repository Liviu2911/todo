import type { Response, Request } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const projects = async (req: Request, res: Response) => {
  // @ts-ignore
  const { userId } = req;
  const { id } = req.body;

  let searchQuery = id ? "AND id=$2" : "";

  const { data: projects, error } = await tryFunc(async () => {
    const projectsRes = await auth.query(
      "SELECT * FROM projects WHERE userid=$1 " + searchQuery,
      id ? [userId, id] : [userId]
    );

    return projectsRes.rows;
  });

  const { data: username, error: usernameError } = await tryFunc(async () => {
    const usernameRes = await auth.query(
      "SELECT username FROM users WHERE id=$1",
      [userId]
    );

    return usernameRes.rows[0].username;
  });

  return res.send({
    projects,
    username,
  });
};

export default projects;
