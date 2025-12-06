import { Request, Response, NextFunction } from "express";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import { prisma } from "../configs/prismaClient";
import httpErrors from "http-errors";
import { createHashPassword } from "../utils/bycrypt.util";

export const registerAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - auth.controller - registerAuthController - start"
    );

    const { email, name, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return httpErrors.Conflict("User with this email already exists");
    }

    const hashedPassword = await createHashPassword(password);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    logger.info("controller - auth.controller - registerAuthController - end");
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    logger.error("Controller-user.controller-RegisterController-Error", error);
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
