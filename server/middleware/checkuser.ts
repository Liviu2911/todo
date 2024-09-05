import type { Response, Request, NextFunction } from "express";
import { auth } from "../db";
import { compare } from "bcrypt";

const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const userRes = await auth.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (!userRes.rowCount) {
      return res.status(404).send({
        success: false,
        error: "User not found",
      });
    }

    const match = await compare(password, userRes.rows[0].password);

    if (!match) {
      return res.status(401).send({
        success: false,
        errro: "Incorect password",
      });
    }

    // @ts-ignore
    req.user = userRes.rows[0];
    next();
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: e,
    });
  }
};

export default checkUser;
