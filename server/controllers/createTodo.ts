import type { Response, Request } from "express";
import { v4 } from "uuid";
import tryFunc from "../try";
import { auth } from "../db";

const createTodo = async (req: Request, res: Response) => {
  const { name, body, expires, userid, statusid } = req.body;
  const id = v4();
  const { error } = await tryFunc(async () => {
    await auth.query(
      "INSERT INTO todos (id, name, userid, statusid, body, expires) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, name, userid, statusid, body, expires]
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

export default createTodo;
