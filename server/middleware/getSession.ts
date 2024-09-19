import type { Response, Request, NextFunction } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const getSession = async (req: Request, res: Response, next: NextFunction) => {
  const { session } = req.cookies;

  const { data, error } = await tryFunc(async () => {
    const sessionRes = await auth.query(
      "SELECT access_token, refresh_token FROM sessions WHERE id=$1",
      [session]
    );
    if (!sessionRes.rowCount) throw new Error("Session was not found");

    return sessionRes.rows[0];
  });

  if (!data || error) {
    return res.status(404).send({
      session: false,
      error: error.message ? error.message : error,
    });
  }

  // @ts-ignore
  req.session = data;

  next();
};

export default getSession;
