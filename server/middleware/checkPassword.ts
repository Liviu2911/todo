import { compare } from "bcrypt";
import type { Response, Request, NextFunction } from "express";

const checkPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  // @ts-ignore
  const { password: hashedPassword } = req.user;

  const match = await compare(password, hashedPassword);

  if (!match) {
    return res.status(401).send({
      success: false,
      error: "Incorect login credentials",
    });
  }

  next();
};

export default checkPassword;
