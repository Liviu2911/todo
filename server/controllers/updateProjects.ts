import type { Response, Request } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const editProject = async (req: Request, res: Response) => {
  const { userid, id, name } = req.body;
  const { error } = await tryFunc(async () => {
    await auth.query(
      "UPDATE projects SET name=$1 WHERE id=$2 AND userid=$3 RETURNING *",
      [name, id, userid]
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

export default editProject;
