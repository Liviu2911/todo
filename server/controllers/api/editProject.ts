import type { Response, Request } from "express";
import { NotAuthorized } from "../../responses";
import tryFunc from "../../try";
import { api } from "../../db";

const editProject = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { id, name } = req.body;

  if (!user || !id) {
    return res.status(401).send({ ...NotAuthorized });
  }

  const { data, error } = await tryFunc(async () => {
    const editRes = await api.query(
      "UPDATE projects SET name=$1 WHERE id=$2 RETURNING *",
      [name, id]
    );

    return editRes.rows[0];
  });

  if (!data || error) {
    return res.status(400).send({
      success: false,
      error: "Couldn't update the project",
    });
  }

  return res.status(200).send({
    success: true,
  });
};

export default editProject;
