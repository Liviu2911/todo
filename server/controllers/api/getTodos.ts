import type { Response, Request } from "express";
import { NotAuthorized } from "../../responses";
import tryFunc from "../../try";
import { api } from "../../db";

const getTodos = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { statusid, id } = req.body;

  if (!user || !statusid) {
    return res.status(400).send({ ...NotAuthorized });
  }

  const { data, error } = await tryFunc(async () => {
    const andQuery = id ? " AND id=$3" : "";
    const todosRes = await api.query(
      `SELECT title, body, ends, id FROM todos WHERE statusid=$1 AND userid=$2 ${andQuery}`,
      id ? [statusid, user, id] : [statusid, user]
    );

    return id ? todosRes.rows[0] : todosRes.rows;
  });

  if (!data || error) {
    return res.status(404).send({
      success: false,
      error,
    });
  }

  return res.status(200).send({
    success: true,
    data,
  });
};

export default getTodos;
