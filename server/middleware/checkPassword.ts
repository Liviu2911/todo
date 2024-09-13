import { compare } from "bcrypt";
import type { Response, Request, NextFunction } from "express";

const checkPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  // @ts-ignore
  const { userPassword } = req;

  const match = await compare(password, userPassword);
  if (!match) {
    return res.status(400).send({
      success: false,
      error: "Invalid credentials",
    });
  }

  next();
};

export default checkPassword;
