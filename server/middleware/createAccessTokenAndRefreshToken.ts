import type { Response, Request, NextFunction } from "express";
import { sign } from "jsonwebtoken";

const createTokens = (req: Request, _: Response, next: NextFunction) => {
  // @ts-ignore
  const { id, key } = req;

  const accessToken = sign({ id }, key, {
    expiresIn: "5m",
    algorithm: "PS512",
  });
  const refreshToken = sign({ id }, key, {
    expiresIn: "1w",
    algorithm: "PS512",
  });

  // @ts-ignore
  req.tokens = {
    accessToken,
    refreshToken,
  };
  next();
};

export default createTokens;
