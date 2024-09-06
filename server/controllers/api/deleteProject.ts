import type { Response, Request } from "express";
import tryFunc from "../../try";
import { api } from "../../db";

const deleteProject = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { id } = req.body;

  if (!id || !user) {
    return res.status(401).send({
      success: false,
      error: "User not authorized",
    });
  }

  const { data, error } = await tryFunc(async () => {
    const deleteRes = await api.query(
      "DELETE FROM projects WHERE id=$1 AND userid=$2 RETURNING *",
      [id, user]
    );

    return deleteRes.rows[0];
  });

  if (!data || error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }

  return res.status(200).send({
    success: true,
    data,
  });
};

export default deleteProject;
