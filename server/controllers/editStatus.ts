import type { Response, Request } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const editStatus = async (req: Request, res: Response) => {
  const { name, userid, projectid, id } = req.body;
  const { error } = await tryFunc(async () => {
    await auth.query(
      "UPDATE statuses SET name=$1 WHERE userid=$2 AND projectid=$3 AND id=$4",
      [name, userid, projectid, id]
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

export default editStatus;
