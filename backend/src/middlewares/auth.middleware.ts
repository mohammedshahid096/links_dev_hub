import { Request, Response, NextFunction } from "express";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import { prisma } from "../configs/prismaClient";
import httpErrors from "http-errors";
import { verifyAccessToken } from "../utils/jwt.util";

declare module "express-serve-static-core" {
  interface Request {
    authUser?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}

// authentication middleware
export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("middleware - auth.middleware - authentication - start");
    let authHeader = req.header("Authorization");

    // Validate token format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(httpErrors.Unauthorized("Authentication token required"));
    }

    // Extract and verify token
    const token = authHeader.split(" ")[1];
    const decode = await verifyAccessToken(token);

    if (!decode.success || !decode.id) {
      const errorMessage = decode.error?.message || "Invalid token";
      return next(httpErrors.Unauthorized(errorMessage));
    }

    let userExist = await prisma.user.findUnique({
      where: { id: decode.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: false,
        created_at: true,
        updated_at: true,
      },
    });

    if (!userExist) return next(httpErrors.NotFound("user not found"));
    req.authUser = {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
    };

    logger.info(`name : ${userExist.name} email: ${userExist.email}`);
    logger.info("middlewares - auth.middleware - authentication - End");
    next();
  } catch (error) {
    logger.error(
      "middleware - auth.middleware - authentication - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// authorization middleware
export const authorization = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("middleware - auth.middleware - authorization - start");
      const authUser = req.authUser;
      if (!authUser) {
        return next(httpErrors.Unauthorized("User not authenticated"));
      }
      if (!roles.includes(authUser.role)) {
        return next(httpErrors.Forbidden("User not authorized"));
      }
      logger.info("middleware - auth.middleware - authorization - end");
      next();
    } catch (error) {
      logger.error(
        "middleware - auth.middleware - authorization - error",
        error
      );
      errorHandling.handlingControllersError(error as AppError, next);
    }
  };
};
