import type { Response, Request, NextFunction } from "express";
import { readFileSync } from "fs";
import path from "path";

const jwtKey = (req: Request, _: Response, next: NextFunction) => {
  const res = path.resolve(__dirname, "../private_key.pem");
  const key = readFileSync(res, "utf-8");

  // @ts-ignore
  req.key = key;
  next();
};

export default jwtKey;
