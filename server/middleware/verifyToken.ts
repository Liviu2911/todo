import type { Response, Request, NextFunction } from "express";
import tryFunc from "../try";
import { verify } from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { tokens, key } = req;

  const { accessToken: token } = tokens;

  const { data, error } = await tryFunc(() => {
    return verify(token, key);
  });

  if (!data || error) {
    next();
    return;
  }

  return res.status(200).send({
    success: true,
    accessToken: token,
  });
};

export default verifyToken;
