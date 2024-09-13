import type { Response, Request, NextFunction } from "express";
import tryFunc from "../try";
import { sign, verify } from "jsonwebtoken";
import { auth } from "../db";
import e from "express";

const tokens = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { key, session } = req;

  const { data: aToken, error: aError } = await tryFunc(() => {
    return verify(session.access_token, key);
  });

  if (!aToken || aError) {
    const { data: rToken, error: rError } = await tryFunc(async () => {
      const refreshTokenRes = await auth.query(
        "SELECT token FROM refresh_tokens WHERE id=$1",
        [session.refresh_token]
      );
      if (!refreshTokenRes.rowCount) throw new Error("Refresh token not found");
      return refreshTokenRes.rows[0];
    });

    if (!rToken || rError) {
      return res.status(404).send({
        session: false,
        error: rError,
      });
    }

    const { data: verRefresh, error: rError2 } = await tryFunc(() => {
      return verify(rToken.token, key);
    });

    if (!verRefresh || rError2) {
      return res.status(400).send({
        session: false,
        error: rError2,
      });
    }

    const { userId } = verRefresh;

    const newAccessToken = sign({ userId }, key, {
      algorithm: "PS512",
      expiresIn: "5m",
    });

    const { error: sessionError } = await tryFunc(async () => {
      await auth.query("UPDATE sessions SET access_token=$1 WHERE id=$2", [
        newAccessToken,
        req.cookies.session,
      ]);
      return;
    });

    if (sessionError) {
      return res.status(400).send({
        session: false,
        error: sessionError,
      });
    }

    // @ts-ignore
    req.userId = userId;
    next();
    return;
  }

  const { userId } = aToken;

  // @ts-ignore
  req.userId = userId;
  next();
};

export default tokens;
