import { Request, Response, Router } from "express";
import { prisma } from "../prisma";
import { hash } from "bcryptjs";
import { validateSignUp } from "../utils/validator";
import { is } from "superstruct";

const register = async (req: Request, res: Response) => {
  try {
    let errors: any = {};
    const { email, password, nickName } = req.body;

    if(!is({ email, password, nickName }, validateSignUp)){
      errors.validation = "이메일이나 닉네임을 확인해주세요.";
      return res.status(400).json(errors);
    }

    const emailCheck = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    const nickNameCheck = await prisma.user.findFirst({
      where: {
        nickName,
      },
      select: {
        nickName: true,
      },
    });

    if (emailCheck)
      errors.email = "해당 이메일 주소로 이미 가입 되어 있습니다.";
    if (nickNameCheck)
      errors.nickName = "해당 닉네임은 이미 사용 중입니다.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    //중복 이메일, 닉네임 없는 경우 가입
    const joinedUser = await prisma.user.create({
      data: {
        email,
        nickName,
        password: await hash(password, 6),
      },
      select: {
        email: true,
        nickName: true,
      },
    });

    return res.status(201).json(joinedUser);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "internal server error!", error: e });
  }
};
const router = Router();
router.post("/register", register);

export default router;
