import type { Response, Request, NextFunction } from "express";
import { auth } from "../db";
import { verify } from "jsonwebtoken";
import { resolve } from "path";
import { readFileSync } from "fs";
import tryFunc from "../try";

const session = async (req: Request, res: Response, next: NextFunction) => {
  const { session: id } = req.cookies;
  const pathRes = resolve(__dirname, "../private_key.pem");
  const key = readFileSync(pathRes, "utf-8");

  const { data: session, error: sessionError } = await tryFunc(async () => {
    const sessionRes = await auth.query(
      "SELECT access_token, refresh_token FROM sessions WHERE id=$1",
      [id]
    );
    if (!sessionRes.rowCount) throw new Error("Session not found");

    return sessionRes.rows[0];
  });

  if (sessionError) {
    return res.status(500).send({
      success: false,
      messaeg: sessionError,
      error: "logout",
    });
  }

  const { access_token, refresh_token } = session;

  const { data: jwt, error: jwtError } = await tryFunc(() => {
    const jwtRes = verify(access_token, key);
    return jwtRes;
  });

  if (jwtError || !jwt) {
    // @ts-ignore
    req.token = refresh_token;
    // @ts-ignore
    req.error = jwtError;

    return next();
  }

  const { userid } = jwt;

  const { data: user, error: userError } = await tryFunc(async () => {
    const userRes = await auth.query("SELECT username FROM users WHERE id=$1", [
      userid,
    ]);
    if (!userRes.rowCount) throw new Error("User not found");

    return userRes.rows[0];
  });

  if (userError || !user) {
    // @ts-ignore
    req.token = refresh_token;
    // @ts-ignore
    req.error = userError;

    return next();
  }

  return res.status(200).send({
    success: true,
    data: user.username,
  });
};

export default session;
