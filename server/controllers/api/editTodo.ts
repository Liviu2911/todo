import type { Response, Request } from "express";
import { NotAuthorized } from "../../responses";
import { api } from "../../db";
import tryFunc from "../../try";

const editTodo = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { title, body, ends, statusid, id } = req.body;

  if (!user || !statusid || !id) {
    return res.status(400).send({ ...NotAuthorized });
  }

  const { data, error } = await tryFunc(async () => {
    const editRes = await api.query(
      "UPDATE todos SET title=$1, body=$2, ends=$3 WHERE id=$4 AND statusid=$5 AND userid=$6 RETURNING *",
      [title, body, ends, id, statusid, user]
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

export default editTodo;
