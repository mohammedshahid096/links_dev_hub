import { Request, Response, NextFunction } from "express";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import { prisma } from "../configs/prismaClient";

// profile controller
export const profileAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
        isActive: true,
        profileUrl: true,
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
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
