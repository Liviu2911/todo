import type { Response, Request } from "express";
import tryFunc from "../try";
import { auth } from "../db";
import { v4 } from "uuid";

const createStatus = async (req: Request, res: Response) => {
  const { userid, projectid, name } = req.body;
  const id = v4();
  const { error } = await tryFunc(async () => {
    await auth.query(
      "INSERT INTO statuses (id, projectid, userid, name) VALUES ($1, $2, $3, $4)",
      [id, projectid, userid, name]
    );
  });

  if (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }

  return res.status(200).send({
    success: true,
  });
};

export default createStatus;
