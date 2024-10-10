import type { Response, Request } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const editTodo = async (req: Request, res: Response) => {
  const { id, userid, statusid, name, body, expires } = req.body;
  const { error } = await tryFunc(async () => {
    return await auth.query(
      "UPDATE todos SET name=$1, body=$2, expires=$3, statusid=$6 WHERE id=$4 AND userid=$5 RETURNING *",
      [name, body, expires, id, userid, statusid]
    );
  });

  console.log(id);

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

export default editTodo;
