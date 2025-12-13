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
import { createAccessToken } from "../utils/jwt.util";

// register controller
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
    logger.error(
      "controller - auth.controller - registerAuthController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// login controller
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

    let token = await createAccessToken(isUserFound.id);

    logger.info("controller - auth.controller - loginAuthController - end");
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Login functionality to be implemented",
      data,
      otherData: { token },
    });
  } catch (error) {
    logger.error(
      "Controller - auth.controller - loginAuthController - Error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// profile controller
export const profileAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("controller - auth.controller - profileAuthController - start");
    const authUser = req.authUser;
    const userProfile = await prisma.user.findUnique({
      where: { id: authUser?.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    logger.info("controller - auth.controller - profileAuthController - end");
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "User profile fetched successfully",
      data: userProfile,
    });
  } catch (error) {
    logger.error(
      "Controller - auth.controller - profileAuthController - Error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
