import type { Response, Request } from "express";
import { auth } from "../db";
import { v4 } from "uuid";
import tryFunc from "../try";

const createProject = async (req: Request, res: Response) => {
  const { name, userid } = req.body;

  const { error } = await tryFunc(async () => {
    return auth.query(
      "INSERT INTO projects (id, userid, name) VALUES($1, $2, $3)",
      [v4(), userid, name]
    );
  });

  if (error) {
    return res.status(400).send({
      suceess: false,
      error,
    });
  }

  return res.status(200).send({
    success: true,
  });
};

export default createProject;
