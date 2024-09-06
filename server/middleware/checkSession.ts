import type { Response, Request, NextFunction } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const checkSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session } = req.cookies;
  if (!session) {
    return res.status(401).send({
      success: false,
      error: "Session not found",
      logout: true,
    });
  }

  const { data, error } = await tryFunc(async () => {
    const sessionRes = await auth.query(
      "SELECT access_token, refresh_token FROM sessions WHERE id=$1",
      [session]
    );
    if (!sessionRes.rowCount) throw new Error("Session not found");

    return sessionRes.rows[0];
  });

  if (!data || error) {
    return res.status(401).send({
      success: false,
      error: error.message ? error.message : error,
      logout: true,
    });
  }

  // @ts-ignore
  req.tokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };

  next();
};

export default checkSession;
