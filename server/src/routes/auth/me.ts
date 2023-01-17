import { Request, Response, Router } from "express";
import userMiddleware from "../../middlewares/userMiddleware";
import {prisma} from "../../prisma";

async function me(req: Request, res: Response) {
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            userId: res.locals.userId
        },
        select:{
            userId :true,
            email: true,
            nickName:true
        }
    })
    return res.status(200).json(user);
}

const router = Router();
router.get("/", userMiddleware, me);
export default router;