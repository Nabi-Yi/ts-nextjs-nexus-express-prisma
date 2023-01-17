import { NextFunction, Request, Response, Router } from "express";
import { assert } from "superstruct";
import { validateCreateSub } from "../../utils/validator";
import { prisma } from "../../prisma";
import { verify } from "jsonwebtoken";
import userMiddleware from "../../middlewares/userMiddleware";

async function createSub(req: Request, res: Response, next: NextFunction) {
  try {
    let errors: any = {};
    const { title, description } = req.body;
    assert({ title, description }, validateCreateSub);

    const checkTitle = await prisma.sub.findUnique({
      where:{
        title
      }
    });
    errors.title = " title is already in use";
    if(checkTitle) return res.status(400).json(errors);

    const createdSub = await prisma.sub.create({
      data: {
        title,
        description,
        userId: res.locals.userId
      },
    });

    return res.status(201).json(createdSub);
  } catch (error: any) {
    console.log(error);
    if (error.key) {
      return res
        .status(400)
        .json({ validation: `${error.key}를 확인해주세요` });
    }
  }
}

const router = Router();
router.post("/", userMiddleware, createSub);

export default router;