import type { Response, Request } from "express";
import tryFunc from "../../try";
import { api } from "../../db";
import { NotAuthorized } from "../../responses";

const deleteTodo = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { id, statusid } = req.body;

  if (!id || !user || !statusid) {
    return res.status(401).send({ ...NotAuthorized });
  }

  const { data, error } = await tryFunc(async () => {
    const deleteRes = await api.query(
      "DELETE FROM todos WHERE id=$1 AND userid=$2 AND statusid=$3 RETURNING *",
      [id, user, statusid]
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

export default deleteTodo;
