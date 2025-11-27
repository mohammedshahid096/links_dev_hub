import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user = await prisma.user.create({
    //   data: {
    //     name: "Shahid",
    //     email: "test@gmail.com",
    //     password: "hashedpassword",
    //   },
    // });
    const user = await prisma.user.findMany();

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};
