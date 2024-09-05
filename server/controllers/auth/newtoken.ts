import { type Response, type Request, response } from "express";
import { sign, verify } from "jsonwebtoken";
import { auth } from "../../db";
import { readFileSync } from "fs";
import path, { resolve } from "path";
import tryFunc from "../../try";

const newAccessToken = async (req: Request, res: Response) => {
  // @ts-ignore
  const { error, token } = req;
  const { session } = req.cookies;

  if (!token) {
    return res.status(404).send({
      success: false,
      error: "logout",
      message: error,
    });
  }

  const { data: refreshToken, error: refreshTokenError } = await tryFunc(
    async () => {
      const tokenRes = await auth.query(
        "SELECT token FROM refresh_tokens WHERE id=$1",
        [token]
      );

      if (!tokenRes.rowCount) {
        throw new Error("Refresh token not found");
      }

      return tokenRes.rows[0].token;
    }
  );

  if (!refreshToken || refreshTokenError) {
    return res.status(500).send({
      success: false,
      error: "logout",
      message: refreshTokenError,
    });
  }

  // Private key for jwt
  const pathRes = resolve(__dirname, "../../private_key.pem");
  const key = readFileSync(pathRes, "utf-8");

  const { data: userid, error: jwtError } = await tryFunc(() => {
    // @ts-ignore
    const { userid } = verify(refreshToken, key);
    return userid;
  });

  if (!userid || jwtError) {
    return res.status(404).send({
      success: false,
      error: jwtError,
    });
  }

  const newToken = sign({ userid }, key, {
    algorithm: "PS512",
    expiresIn: "10m",
  });

  const { data: sessionRes, error: sessionError } = await tryFunc(async () => {
    const sessionResposne = await auth.query(
      "UPDATE sessions SET access_token=$1 WHERE id=$2 RETURNING *",
      [newToken, session]
    );

    if (!sessionResposne.rowCount) {
      throw new Error("Session not found");
    }

    return sessionResposne.rows[0];
  });

  if (!sessionRes || sessionError) {
    return res.status(404).send({
      success: false,
      error: "logout",
      message: sessionError,
    });
  }

  const { data: user, error: userError } = await tryFunc(async () => {
    const userRes = await auth.query("SELECT username FROM users WHERE id=$1", [
      userid,
    ]);

    if (!userRes.rowCount) {
      throw new Error("User not found");
    }

    return userRes.rows[0];
  });

  if (!user || userError) {
    return res.status(500).send({
      success: false,
      error: userError,
    });
  }

  return res.status(200).send({
    user,
  });
};

export default newAccessToken;
