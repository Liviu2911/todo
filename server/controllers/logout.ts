import type { Response, Request } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const logout = async (req: Request, res: Response) => {
  const { session } = req.cookies;

  const { data: refreshTokenId, error } = await tryFunc(async () => {
    const sessionRes = await auth.query(
      "DELETE FROM sessions WHERE id=$1 RETURNING refresh_token",
      [session]
    );

    return sessionRes.rows[0].refresh_token;
  });
  if (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }

  const { error: refreshTokenError } = await tryFunc(async () => {
    await auth.query("DELETE FROM refresh_tokens WHERE id=$1", [
      refreshTokenId,
    ]);
  });

  if (refreshTokenError) {
    return res.status(400).send({
      success: false,
      error: refreshTokenError,
    });
  }

  res.clearCookie("session");

  return res.status(200).send({
    success: true,
  });
};

export default logout;
