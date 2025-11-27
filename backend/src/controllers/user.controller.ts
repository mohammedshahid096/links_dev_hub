import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findMany({
      select: { name: true, email: true, role: true },
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};
