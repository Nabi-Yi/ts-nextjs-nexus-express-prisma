import { NextFunction, Request, Response, Router } from "express";
import { assert } from "superstruct";
import { validateCreateSub } from "../../utils/validator";
import { prisma } from "../../prisma";
import { verify } from "jsonwebtoken";
import userMiddleware from "../../middlewares/userMiddleware";
import { Sub } from "@prisma/client";

async function createSub(req: Request, res: Response, next: NextFunction) {
  try {
    let errors: any = {};
    const { title, description } = req.body;
    assert({ title, description }, validateCreateSub);

    const createdSub = await prisma.sub.create({
      data: {
        title,
        description,
        userId: res.locals.userId,
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
    if (error.code === "P2002") {
      return res.status(400).json({ error: "이미 사용중인 title입니다" });
    }
  }
}

async function getTopSubs(req: Request, res: Response) {
  const topSubs = await prisma.sub.findMany({
    take: 5,
    orderBy: {
      post: {
        _count: "desc",
      },
    },
    include: {
      _count: true,
    },
  });
  topSubs.map((sub) => {
    if (!sub.imageUrl)
      sub.imageUrl = "https://www.gravatar.com/avatar?d=mp&f=y";
  });
  return res.status(200).json(topSubs);
}

async function getSubDetails(req: Request, res: Response) {
  try {
    const title = req.params.title;
    const subDetails = await prisma.sub.findUniqueOrThrow({
      where: {
        title,
      },
      include: {
        post: true,
      },
    });
    return res.status(200).json(subDetails);
  } catch (error) {
    return res.status(404).json("cannot find sub");
  }
}

const router = Router();
router.get("/:title", userMiddleware, getSubDetails);
router.get("/topSubs", getTopSubs);
router.post("/", userMiddleware, createSub);

export default router;
