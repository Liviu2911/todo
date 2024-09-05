import type { Response, Request } from "express";
import { api } from "../../db";
import tryFunc from "../../try";

const getProjects = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { id } = req.body;

  if (!user) {
    return res.status(401).send({
      success: false,
      error: "User not found",
    });
  }

  const { data, error: dataError } = await tryFunc(async () => {
    const queryId = id ? " AND id=$2" : "";
    const dataRes = await api.query(
      `SELECT name, id FROM projects WHERE userid=$1 ${queryId}`,
      id ? [user.toString(), id] : [user.toString()]
    );

    return id ? dataRes.rows[0] : dataRes.rows;
  });

  if (!data || dataError) {
    return res.status(404).send({
      success: false,
      error: dataError,
    });
  }

  return res.status(200).send({
    success: true,
    data,
  });
};

export default getProjects;
