import { Request, Response, NextFunction } from "express";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import { prisma } from "../configs/prismaClient";
import httpErrors from "http-errors";
import {
  createHashPassword,
  verifyPasswordMethod,
} from "../utils/bycrypt.util";

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
      return next(httpErrors.Conflict("User with this email already exists"));
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

export const loginAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("controller - auth.controller - loginAuthController - start");
    const { email, password } = req.body;

    let isUserFound = await prisma.user.findUnique({
      where: { email },
    });

    if (!isUserFound) {
      return next(httpErrors.BadRequest("Invalid email or password"));
    }

    let isPasswordMatched = await verifyPasswordMethod(
      password,
      isUserFound?.password!
    );

    if (!isPasswordMatched) {
      return next(httpErrors.BadRequest("Invalid email or password"));
    }
    let data: Partial<typeof isUserFound> = { ...isUserFound };

    delete data.password;

    logger.info("controller - auth.controller - loginAuthController - end");
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Login functionality to be implemented",
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - auth.controller - loginAuthController - Error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
