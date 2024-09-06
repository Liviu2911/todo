import type { Response, Request } from "express";
import tryFunc from "../../try";
import { sign, verify } from "jsonwebtoken";
import { auth } from "../../db";

const newAccessToken = async (req: Request, res: Response) => {
  // @ts-ignore
  const { tokens, key } = req;
  const { refreshToken: rtid } = tokens;
  const { session } = req.cookies;

  const { data: refreshTokenRes, error: rtError } = await tryFunc(async () => {
    const rtRes = await auth.query(
      "SELECT token FROM refresh_tokens WHERE id=$1",
      [rtid]
    );

    if (!rtRes.rowCount) throw new Error("No refresh token found");

    return rtRes.rows[0];
  });

  if (!refreshTokenRes || rtError) {
    return res.status(401).send({
      success: false,
      error: rtError.message ? rtError.message : rtError,
    });
  }

  const { token: refreshToken } = refreshTokenRes;

  const { data, error } = await tryFunc(() => {
    return verify(refreshToken, key);
  });

  if (!data || error) {
    return res.status(401).send({
      success: false,
      error,
      logout: true,
    });
  }

  const newToken = sign({ id: data.id }, key, {
    algorithm: "PS512",
    expiresIn: "5m",
  });

  const { data: sessionUpdate, error: sessionError } = await tryFunc(
    async () => {
      const sessionRes = await auth.query(
        "UPDATE sessions SET access_token=$1 WHERE id=$2 RETURNING *",
        [newToken, session]
      );

      if (!sessionRes.rowCount) throw new Error("Session not found");

      return sessionRes.rows[0];
    }
  );

  if (!sessionUpdate || sessionError) {
    return res.status(401).send({
      success: false,
      error: sessionError.message ? sessionError.message : sessionError,
    });
  }

  return res.status(200).send({
    success: true,
    accessToken: newToken,
  });
};

export default newAccessToken;
