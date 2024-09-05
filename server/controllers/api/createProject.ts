import type { Response, Request } from "express";
import tryFunc from "../../try";
import { api } from "../../db";
import { v4 } from "uuid";

const createProject = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { name } = req.body;

  if (!user) {
    return res.status(401).send({
      success: false,
      error: "User not authorized",
    });
  }

  const { data: project, error } = await tryFunc(async () => {
    const projectRes = await api.query(
      "INSERT INTO projects (id, userid, name) VALUES ($1, $2, $3) RETURNING *",
      [v4(), user.toString(), name]
    );

    return projectRes.rows[0];
  });

  if (!project || error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }

  return res.status(201).send({
    success: true,
    project,
  });
};

export default createProject;
