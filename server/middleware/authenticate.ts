import type { Response, Request, NextFunction } from "express";
import { readFileSync } from "fs";
import { verify } from "jsonwebtoken";
import path from "path";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      success: false,
      error: "You are not authorized for such actions",
    });
  }
  const pathRes = path.resolve(__dirname, "../private_key.pem");
  const key = readFileSync(pathRes, "utf-8");

  try {
    const tokenRes = verify(token, key);
    // @ts-ignore
    req.user = tokenRes.userid;
    next();
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: e,
    });
  }
};

export default authenticate;
