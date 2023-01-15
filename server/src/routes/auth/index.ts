import Login from "./login";
import Signup from "./signup";

import express from "express";
import login from "./login";
import signup from "./signup";

const app = express();

app.use("/signup", signup);
app.use("/login", login);

export default app;
