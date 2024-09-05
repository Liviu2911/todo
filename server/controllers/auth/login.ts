import type { Response, Request } from "express";
import { auth } from "../../db";
import { sign } from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { v4 } from "uuid";

const login = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;

  try {
    const pathRes = path.resolve(__dirname, "../../private_key.pem");
    const key = fs.readFileSync(pathRes, "utf-8");

    const accessToken = sign({ userid: user.id }, key, {
      algorithm: "PS512",
      expiresIn: "10s",
    });
    const refreshToken = sign({ userid: user.id }, key, {
      algorithm: "PS512",
      expiresIn: "7d",
    });

    const refreshTokenId = v4();
    const sessionId = v4();

    const refreshTokenRes = await auth.query(
      "INSERT INTO refresh_tokens (id, token) VALUES ($1, $2) RETURNING *",
      [refreshTokenId, refreshToken]
    );
    const sessionRes = await auth.query(
      "INSERT INTO sessions (id, userid, access_token, refresh_token) VALUES ($1, $2, $3, $4) RETURNING *",
      [sessionId, user.id, accessToken, refreshTokenId]
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).send({
      success: true,
      session: sessionRes.rows[0],
      refreshToken: refreshTokenRes.rows[0],
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: e,
    });
  }
};

export default login;
