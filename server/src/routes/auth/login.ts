import { Request, Response, Router } from "express";
import { prisma } from "../../prisma";
import { compare } from "bcryptjs";
import { validateLogin } from "../../utils/validator";
import { assert } from "superstruct";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    assert({ email, password }, validateLogin);

    const loginUser = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
      select: {
        userId: true,
        email: true,
        password: true,
      },
    });

    if (!(await compare(password, loginUser.password))) {
      return res.status(401).json({ password: "잘못된 비밀번호 입니다" });
    }

    const token = sign(
      { userId: loginUser.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    res.set(
      "Set-Cookie",
      serialize("Authorization", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    );
    return res.status(200).json(token);
  } catch (error: any) {
    console.log(error);
    if (error.key) {
      return res
        .status(400)
        .json({ validation: `${error.key}를 확인해주세요` });
    }
    if (error.code === "P2025") {
      return res.status(404).json({ message: "존재하지 않는 사용자입니다." });
    }
    return res.status(500).json({ error });
  }
}

const router = Router();
router.post("/login", login);
