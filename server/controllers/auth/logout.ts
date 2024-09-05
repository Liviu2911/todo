import type { Response, Request } from "express";
import { auth } from "../../db";

const logout = async (req: Request, res: Response) => {
  // @ts-ignore
  const { user } = req;
  const { session } = req.cookies;

  try {
    const sessionRes = await auth.query(
      "DELETE FROM sessions WHERE id=$1 AND userid=$2 RETURNING *",
      [session, user]
    );

    const { refresh_token } = sessionRes.rows[0];
    await auth.query("DELETE FROM refresh_tokens WHERE id=$1", [refresh_token]);

    res.clearCookie("session");

    return res.status(200).send({
      success: true,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: e,
    });
  }
};

export default logout;
