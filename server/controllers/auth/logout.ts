import type { Response, Request } from "express";
import tryFunc from "../../try";
import { auth } from "../../db";

const logout = async (req: Request, res: Response) => {
  const { session } = req.cookies;

  const { data: deleteSession, error: deleteError } = await tryFunc(
    async () => {
      const deleteRes = await auth.query(
        "DELETE FROM sessions WHERE id=$1 RETURNING *",
        [session]
      );

      if (!deleteRes.rowCount) throw new Error("Couldn't logout");

      return deleteRes.rows[0];
    }
  );

  if (!deleteSession || deleteError) {
    return res.status(400).send({
      success: false,
      error: deleteError.message ? deleteError.message : deleteError,
    });
  }

  const { refresh_token } = deleteSession;

  const { data: deleteToken, error: tokenError } = await tryFunc(async () => {
    const tokenRes = await auth.query(
      "DELETE FROM refresh_tokens WHERE id=$1 RETURNING *",
      [refresh_token]
    );

    if (!tokenRes.rowCount) throw new Error("Couldn't logout");

    return tokenRes.rows[0];
  });

  if (!deleteToken || tokenError) {
    return res.status(400).send({
      success: false,
      error: tokenError.message ? tokenError.message : tokenError,
    });
  }

  res.clearCookie("session");
  return res.status(200).send({
    success: true,
    messsage: "User logged out successfuly",
  });
};

export default logout;
