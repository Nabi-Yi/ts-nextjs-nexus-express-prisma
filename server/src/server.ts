import express from "express";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("running"));

let port = 4000;

app.listen(port, async () => {
    console.log(`server running at http://localhost: ${port}`);
});