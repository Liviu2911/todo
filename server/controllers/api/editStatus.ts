import type { Response, Request } from "express";
import { NotAuthorized } from "../../responses";
import tryFunc from "../../try";
import { api } from "../../db";

const editStatus = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { name, projectid, id } = req.body;

  if (!user || !projectid || !id) {
    return res.status(400).send({ ...NotAuthorized });
  }

  const { data, error } = await tryFunc(async () => {
    const editRes = await api.query(
      "UPDATE statuses SET name=$1 WHERE id=$2 AND projectid=$3 AND userid=$4 RETURNING *",
      [name, id, projectid, user]
    );

    return editRes.rows[0];
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

export default editStatus;
