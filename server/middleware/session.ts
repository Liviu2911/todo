import type { Response, Request, NextFunction } from "express";
import { auth } from "../db";
import { verify } from "jsonwebtoken";
import { resolve } from "path";
import { readFileSync } from "fs";

const session = async (req: Request, res: Response, next: NextFunction) => {
  const { session: id } = req.cookies;

  try {
    const sessionRes = await auth.query(
      "SELECT access_token, refresh_token FROM sessions WHERE id=$1",
      [id]
    );
    if (!sessionRes.rowCount) {
      return res.status(404).send({
        success: false,
        error: "logout",
        message: "At getting session",
      });
    }
    const { access_token, refresh_token } = sessionRes.rows[0];

    // @ts-ignore
    req.token = refresh_token;

    try {
      const pathRes = resolve(__dirname, "../private_key.pem");
      const key = readFileSync(pathRes, "utf-8");
      // @ts-ignore
      const { userid } = verify(access_token, key);

      try {
        const userRes = await auth.query(
          "SELECT username FROM users WHERE id=$1",
          [userid]
        );

        if (!userRes.rowCount) {
          return res.status(404).send({
            success: false,
            error: "logout",
            message: "At gettin user",
          });
        }

        return res.status(200).send({
          success: true,
          data: userRes.rows[0],
        });
      } catch (e) {
        return res.status(500).send({
          success: false,
          error: e,
        });
      }
    } catch (e) {
      // @ts-ignore
      req.error = e;
      next();
    }
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: e,
    });
  }
};

export default session;
