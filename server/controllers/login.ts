import type { Response, Request } from "express";
import { v4 } from "uuid";
import tryFunc from "../try";
import { auth } from "../db";
import { sign } from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  // @ts-ignore
  const { userId, key } = req;

  const sessionId = v4();
  const refreshTokenId = v4();

  const refreshToken = sign({ userId }, key, {
    algorithm: "PS512",
    expiresIn: "7d",
  });
  const accessToken = sign({ userId }, key, {
    algorithm: "PS512",
    expiresIn: "1m",
  });

  const { data: refreshTokenData, error: refreshTokenError } = await tryFunc(
    async () => {
      const refreshTokenRes = await auth.query(
        "INSERT INTO refresh_tokens (id, token) VALUES ($1, $2) RETURNING *",
        [refreshTokenId, refreshToken]
      );

      if (!refreshTokenRes.rowCount)
        throw new Error("Session could not be created");
      return refreshTokenRes.rows[0].token;
    }
  );

  if (!refreshTokenData || refreshTokenError) {
    return res.status(400).send({
      success: false,
      error: refreshTokenError,
    });
  }

  const { data: sessionData, error: sessionError } = await tryFunc(async () => {
    const sessionRes = await auth.query(
      "INSERT INTO sessions (id, access_token, refresh_token, userid) VALUES ($1, $2, $3, $4) RETURNING *",
      [sessionId, accessToken, refreshTokenId, userId]
    );

    if (!sessionRes.rowCount) throw new Error("Session could not be created");
    return sessionRes.rows[0];
  });

  if (!sessionData || sessionError) {
    return res.status(400).send({
      success: false,
      error: sessionError,
    });
  }

  res.cookie("session", sessionId, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).send({
    success: true,
  });
};

export default login;
