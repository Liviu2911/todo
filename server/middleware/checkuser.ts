import type { Response, Request, NextFunction } from "express";
import tryFunc from "../try";
import { auth } from "../db";

const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const { data: user, error } = await tryFunc(async () => {
    const userRes = await auth.query(
      "SELECT username, id, password FROM users WHERE email=$1",
      [email]
    );
    if (!userRes.rowCount) throw new Error("Incorect login credentials");

    return userRes.rows[0];
  });

  if (!user || error) {
    return res.status(404).send({
      success: false,
      error: error.message ? error.message : error,
    });
  }

  // @ts-ignore
  req.user = user;
  // @ts-ignore
  req.id = user.id;

  next();
};

export default checkUser;
