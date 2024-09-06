import type { Response, Request } from "express";
import tryFunc from "../../try";
import { auth } from "../../db";
import { v4 } from "uuid";

const createSession = async (req: Request, res: Response) => {
  // @ts-ignore
  const { tokens, id } = req;

  const sessionId = v4();
  const refreshTokenId = v4();

  const { data: refreshToken, error: refreshTokenError } = await tryFunc(
    async () => {
      const refreshTokenRes = await auth.query(
        "INSERT INTO refresh_tokens (id, token) VALUES ($1, $2) RETURNING *",
        [refreshTokenId, tokens.refreshToken]
      );
      if (!refreshTokenRes.rowCount) throw new Error("Couldn't create session");

      return refreshTokenRes.rows[0];
    }
  );

  if (!refreshToken || refreshTokenError) {
    return res.status(400).send({
      success: false,
      error: refreshTokenError.message
        ? refreshTokenError.message
        : refreshTokenError,
    });
  }

  const { data: session, error: sessionError } = await tryFunc(async () => {
    const sessionRes = await auth.query(
      "INSERT INTO sessions (id, refresh_token, access_token, userid) VALUES ($1, $2, $3, $4) RETURNING *",
      [sessionId, refreshTokenId, tokens.accessToken, id]
    );
    if (!sessionRes.rowCount) throw new Error("Couldn't create session");

    return sessionRes.rows[0];
  });

  if (!session || sessionError) {
    return res.status(400).send({
      success: false,
      error: sessionError.message ? sessionError.message : sessionError,
    });
  }

  res.cookie("session", sessionId, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).send({
    success: true,
    message: "User logged in successfuly",
  });
};

export default createSession;
