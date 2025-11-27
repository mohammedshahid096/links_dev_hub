import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";

export const getAllCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.category.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
