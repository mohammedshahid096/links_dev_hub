import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";
import logger from "../configs/logger.config";
import {
  SortOrder,
  UserWhereInput,
} from "../../generated/prisma/internal/prismaNamespace";
import responseHandlingUtil from "../utils/responseHandling.util";
import errorHandling, { AppError } from "../utils/errorHandling.util";

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - adminUsers.controller - getAllUsersController - start",
    );

    let {
      sortBy = "desc",
      page = "1",
      limit = "20",
      email,
    }: {
      sortBy?: SortOrder;
      page?: string | number;
      limit?: string | number;
      email?: string;
    } = req.query;

    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Number(limit));
    const skip = (pageNumber - 1) * limitNumber;

    // 1. Define Filter Criteria
    let where: UserWhereInput = {
      // isActive: true,
    };

    if (email) {
      where.email = {
        contains: email,
        mode: "insensitive", // Case-insensitive search
      };
    }

    // 2. Fetch Data and Total Count in parallel
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { created_at: sortBy },
        skip: skip,
        take: limitNumber,
      }),
      prisma.user.count({ where }),
    ]);

    // 3. Pagination Logic
    const totalPages = Math.ceil(totalCount / limitNumber);
    const hasNext = pageNumber < totalPages;
    const hasPrevious = pageNumber > 1;

    const data = {
      page: pageNumber,
      limit: limitNumber,
      totalCount,
      totalPages,
      hasNext,
      hasPrevious,
      users,
    };

    logger.info(
      "controller - adminUsers.controller - getAllUsersController- end",
    );

    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "users fetched successfully",
      data,
    });
  } catch (error) {
    logger.error(
      "controller - adminUsers.controller - getAllUsersController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
