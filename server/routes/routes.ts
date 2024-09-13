import express from "express";
import createUser from "../middleware/createuser";
import key from "../middleware/key";
import login from "../controllers/login";
import checkUser from "../middleware/checkUser";
import checkPassword from "../middleware/checkPassword";
import getSession from "../middleware/getSession";
import tokens from "../middleware/tokens";
import projects from "../controllers/projects";

const router = express.Router();

router.route("/register").post(createUser, key, login);
// create user -> create new session and refresh token -> store session id in cookie
router.route("/login").post(checkUser, checkPassword, key, login);
// check user -> check password -> create new session and refresh token -> store session id in cookie
router.route("/session").post(key, getSession, tokens, projects);
// get session -> access token good -> get the user's username and id -> get project(s), statuses and todos and return em' except for id

export default router;
