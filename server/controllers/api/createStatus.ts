import type { Response, Request } from "express";
import tryFunc from "../../try";
import { api } from "../../db";
import { v4 } from "uuid";

const createStatus = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { name, projectid } = req.body;

  if (!user || !projectid) {
    return res.status(401).send({
      success: false,
      error: "User not authorized",
    });
  }

  const { data: status, error } = await tryFunc(async () => {
    const statusRes = await api.query(
      "INSERT INTO statuses (id, userid, projectid, name) VALUES ($1, $2, $3, $4) RETURNING *",
      [v4(), user, projectid, name]
    );

    return statusRes.rows[0];
  });

  if (!status || error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }

  return res.status(201).send({
    success: true,
    status,
  });
};

export default createStatus;
