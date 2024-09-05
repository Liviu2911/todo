import express from "express";
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";
import checkUser from "../middleware/checkuser";
import authenticate from "../middleware/authenticate";
import logout from "../controllers/auth/logout";
import session from "../middleware/session";
import newAccessToken from "../controllers/auth/newtoken";
import getAccessToken from "../controllers/auth/getAccessToken";
import getProjects from "../controllers/api/getProjects";
import createProject from "../controllers/api/createProject";
import editProject from "../controllers/api/editProject";
import getStatuses from "../controllers/api/getStatuses";
import createStatus from "../controllers/api/createStatus";
import editStatus from "../controllers/api/editStatus";
import deleteProject from "../controllers/api/deleteProject";
import deleteStatus from "../controllers/api/deleteStatus";
import createTodo from "../controllers/api/createTodo";
import getTodos from "../controllers/api/getTodos";
import deleteTodo from "../controllers/api/deleteTodo";
import editTodo from "../controllers/api/editTodo";

const router = express.Router();
router.use(
  [
    "/logout",
    "/projects",
    "/project",
    "/statuses",
    "/status",
    "/todos",
    "/todo",
  ],
  authenticate
);

// Auth
router.route("/register").post(register);
router.route("/login").post(checkUser, login);
router.route("/logout").delete(logout);
router.route("/session").get(session, newAccessToken);
router.route("/gettoken").get(getAccessToken);

// Api
router.route("/projects").get(getProjects);
router
  .route("/project")
  .post(createProject)
  .put(editProject)
  .delete(deleteProject);

router.route("/statuses").get(getStatuses);
router.route("/status").post(createStatus).put(editStatus).delete(deleteStatus);

router.route("/todos").get(getTodos);
router.route("/todo").post(createTodo).delete(deleteTodo).put(editTodo);

export default router;
