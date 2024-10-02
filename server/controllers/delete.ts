import type { Response, Request } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const deleteThing = (table: string) => async (req: Request, res: Response) => {
  const { userid, id } = req.body;

  const { error } = await tryFunc(async () => {
    await auth.query(`DELETE FROM ${table} WHERE id=$1 AND userid=$2`, [
      id,
      userid,
    ]);
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

export default deleteThing;
