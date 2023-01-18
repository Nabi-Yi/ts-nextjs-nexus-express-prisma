import { Request, Response, Router } from "express";
import { serialize } from "cookie";
import userMiddleware from "../../middlewares/userMiddleware";

async function logout(req: Request, res: Response) {
    try {
        res.set(
            "Set-Cookie",
            serialize("Authorization", "", {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 0,
                path: "/",
            })
        );
        return res.status(200).json("success");
    } catch (error: any) {
        console.log(error);
    }
}

const router = Router();
router.post("/", userMiddleware, logout);
export default router;
