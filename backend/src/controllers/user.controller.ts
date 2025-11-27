import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        role: true,
        categories: {
          select: { name: true, slug: true },
        },
      },
      // include: { categories: true },
    });
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};
