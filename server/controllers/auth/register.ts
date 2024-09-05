import type { Response, Request } from "express";
import { v4 } from "uuid";
import { auth } from "../../db";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertRes = await auth.query(
      "INSERT INTO users (id, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [v4(), email, username, hashedPassword]
    );
    return res.status(201).send({
      success: true,
      data: insertRes.rows[0],
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: e,
    });
  }
};

export default register;
