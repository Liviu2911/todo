import type { Response, Request, NextFunction } from "express";
import { v4 } from "uuid";
import tryFunc from "../try";
import { auth } from "../db";
import { hash } from "bcrypt";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password } = req.body;

  const hasedPassword = await hash(password, 10);
  const id = v4();
  const { data: user, error } = await tryFunc(async () => {
    const userRes = await auth.query(
      "INSERT INTO users (id, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, email, username, hasedPassword]
    );

    if (!userRes.rowCount) throw new Error("Couldn't create new user");

    return userRes.rows[0];
  });

  if (error || !user) {
    return res.status(400).send({
      success: false,
      error: error.message ? error.message : error,
    });
  }

  // @ts-ignore
  req.id = id;
  next();
};

export default createUser;
