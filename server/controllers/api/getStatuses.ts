import type { Response, Request } from "express";
import { NotAuthorized } from "../../responses";
import tryFunc from "../../try";
import { api } from "../../db";

const getStatuses = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { projectid, id } = req.body;

  if (!user || !projectid) {
    return res.status(400).send({ ...NotAuthorized });
  }

  const { data, error } = await tryFunc(async () => {
    const andQuery = id ? " AND id=$3" : "";
    const statusesRes = await api.query(
      `SELECT name, id FROM statuses WHERE projectid=$1 AND userid=$2 ${andQuery}`,
      id ? [projectid, user, id] : [projectid, user]
    );

    return id ? statusesRes.rows[0] : statusesRes.rows;
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

export default getStatuses;
