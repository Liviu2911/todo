import type { Response, Request } from "express";
import tryFunc from "../../try";
import { auth } from "../../db";

const getAccessToken = async (req: Request, res: Response) => {
  const { session } = req.cookies;
  const { data: accessToken, error } = await tryFunc(async () => {
    const sessionRes = await auth.query(
      "SELECT access_token FROM sessions WHERE id=$1",
      [session]
    );

    if (!sessionRes.rowCount) {
      throw new Error("No session found");
    }

    return sessionRes.rows[0].access_token;
  });

  if (!accessToken || error) {
    return res.status(500).send({
      success: false,
      error: "logout",
      message: error,
    });
  }

  return res.status(200).send({
    success: true,
    token: accessToken,
  });
};

export default getAccessToken;
