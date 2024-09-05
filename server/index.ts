import express from "express";
import cookieParser from "cookie-parser";
import headers from "./middleware/headers";
import router from "./routes/routes";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(headers);
app.use("/api/v1/todo", router);

app.listen(3000, () => console.log("App runnin"));
