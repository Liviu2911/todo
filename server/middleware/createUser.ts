import type { Response, Request, NextFunction } from "express";
import tryFunc from "../try";
import { auth } from "../db";
import { v4 } from "uuid";
import { hash } from "bcrypt";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = v4();
  const { username, email, password } = req.body;
  const hashedPassword = await hash(password, 10);
  const { data, error } = await tryFunc(async () => {
    const userRes = await auth.query(
      "INSERT INTO users (id, username, email, password) VALUES($1, $2, $3, $4) RETURNING *",
      [userId, username, email, hashedPassword]
    );

    if (!userRes.rowCount) throw new Error("User could not be created");
    return userRes.rows[0];
  });

  if (!data || error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error: error || error.message,
    });
  }

  // @ts-ignore
  req.userId = userId;
  // @ts-ignore
  next();
};

export default createUser;
