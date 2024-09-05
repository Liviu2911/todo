import type { Response, Request } from "express";
import { NotAuthorized } from "../../responses";
import { api } from "../../db";
import { v4 } from "uuid";
import tryFunc from "../../try";

const createTodo = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { title, body, ends, statusid } = req.body;

  if (!user || !statusid) {
    return res.status(400).send({ ...NotAuthorized });
  }

  const { data, error } = await tryFunc(async () => {
    const todoId = v4();
    const todoRes = await api.query(
      "INSERT INTO todos (id, userid, statusid, title, body, ends) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [todoId, user, statusid, title, body, ends]
    );

    return todoRes.rows[0];
  });

  if (!data || error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }

  return res.status(200).send({
    success: true,
    data,
  });
};

export default createTodo;
