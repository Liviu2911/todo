import type { Response, Request, NextFunction } from "express";
import { readFileSync } from "fs";
import { resolve } from "path";

const key = (req: Request, res: Response, next: NextFunction) => {
  const pathRes = resolve(__dirname, "../private_key.pem");
  const key = readFileSync(pathRes, "utf-8");

  // @ts-ignore
  req.key = key;
  next();
};

export default key;
