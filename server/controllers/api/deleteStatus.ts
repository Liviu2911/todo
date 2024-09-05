import type { Response, Request } from "express";
import type { Table } from "../../types";
import tryFunc from "../../try";
import { api } from "../../db";

const deleteStatus = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { id, projectid } = req.body;

  if (!id || !user || !projectid) {
    return res.status(401).send({
      success: false,
      error: "User not authorized",
    });
  }

  const { data, error } = await tryFunc(async () => {
    const deleteRes = await api.query(
      "DELETE FROM statuses WHERE id=$1 AND userid=$2 AND projectid=$3 RETURNING *",
      [id, user, projectid]
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

export default deleteStatus;
