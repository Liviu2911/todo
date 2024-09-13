import type { Response, Request } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const projects = async (req: Request, res: Response) => {
  // @ts-ignore
  const { userId } = req;
  const { id } = req.body;

  let searchQuery = id ? "AND id=$2" : "";

  const { data: projectsRes, error } = await tryFunc(async () => {
    const projectsRes = await auth.query(
      "SELECT * FROM projects WHERE userid=$1 " + searchQuery,
      id ? [userId, id] : [userId]
    );

    return projectsRes.rows;
  });

  if (error) {
    return res.status(404).send({
      session: false,
      error,
    });
  }

  const { data: username, error: usernameError } = await tryFunc(async () => {
    const usernameRes = await auth.query(
      "SELECT username FROM users WHERE id=$1",
      [userId]
    );

    return usernameRes.rows[0].username;
  });

  if (usernameError) {
    return res.status(404).send({
      session: false,
      error: usernameError,
    });
  }

  const { data: statusesRes, error: statusError } = await tryFunc(async () => {
    return (
      await auth.query(
        "SELECT * FROM statuses WHERE userid=$1 " + searchQuery,
        id ? [userId, id] : [userId]
      )
    ).rows;
  });

  if (statusError) {
    return res.status(404).send({
      session: false,
      error: statusError,
    });
  }

  const { data: todosRes, error: todoError } = await tryFunc(async () => {
    return (
      await auth.query(
        "SELECT * FROM todos WHERE userid=$1 " + searchQuery,
        id ? [userId, id] : [userId]
      )
    ).rows;
  });

  if (todoError) {
    return res.status(404).send({
      session: false,
      error: todoError,
    });
  }

  const statuses = statusesRes.map((status: Record<string, unknown>) => ({
    ...status,
    todos: todosRes.filter(
      (todo: Record<string, unknown>) => todo.statusid === status.id
    ),
  }));

  const projects = projectsRes.map((project: Record<string, unknown>) => ({
    ...project,
    statuses: statuses.filter(
      (status: Record<string, unknown>) => status.projectid === project.id
    ),
  }));

  return res.send({
    projects,
    username,
  });
};

export default projects;
