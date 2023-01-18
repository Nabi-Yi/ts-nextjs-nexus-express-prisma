import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default async function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    // if (!token) return res.status(403).json({ error: "please login first" });
    if (!token) return next();
    const { userId }: any = verify(token, process.env.JWT_SECRET as string);

    res.locals.userId = userId;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}