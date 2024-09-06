import express from "express";
import createUser from "../middleware/createUser";
import jwtKey from "../middleware/jwtKey";
import createTokens from "../middleware/createAccessTokenAndRefreshToken";
import createSession from "../controllers/auth/createSession";
import logout from "../controllers/auth/logout";
import checkPassword from "../middleware/checkPassword";
import checkUser from "../middleware/checkuser";
import checkSession from "../middleware/checkSession";
import verifyToken from "../middleware/verifyToken";
import newAccessToken from "../controllers/auth/newAccessToken";

const router = express.Router();

// Auth
router.route("/register").post(createUser, jwtKey, createTokens, createSession);
router.route("/logout").delete(logout);
router
  .route("/login")
  .post(checkUser, checkPassword, jwtKey, createTokens, createSession);
router.route("/session").get(checkSession, jwtKey, verifyToken, newAccessToken);

// Api

export default router;
