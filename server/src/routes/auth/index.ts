import express from "express";
import login from "./login";
import signup from "./signup";
import me from "./me";
import logut from "./logut";

const app = express();

app.use("/signup", signup);
app.use("/login", login);
app.use("/me", me);
app.use("/logout", logut);
export default app;
