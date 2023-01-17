import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth/index";
import subRoutes from "./routes/sub/sub"
import dotenv from "dotenv";

import cors from "cors";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/sub", subRoutes)

app.get("/", (req, res) => res.send("running"));

let port = 4000;

app.listen(port, async () => {
  console.log(`server running at http://localhost: ${port}`);
});
