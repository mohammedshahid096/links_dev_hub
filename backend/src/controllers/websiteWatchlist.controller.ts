import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import httpErrors from "http-errors";
import {
  SortOrder,
  WebsiteWatchlistWhereInput,
} from "../../generated/prisma/internal/prismaNamespace";

// create github repo controller
export const addNewWebsiteWatchlistController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - websiteWatchlist.controller - addNewWebsiteWatchlistController - start",
    );

    const { websiteId } = req.body;

    // Check for website exist or not
    const isWebsiteExist = await prisma.website.findUnique({
      select: { id: true, title: true },
      where: { id: websiteId },
    });
    if (!isWebsiteExist) {
      return next(httpErrors.NotFound("Give Website id is not exist"));
    }

    const authUser = req.authUser;

    const isAlreadyWatchlisted = await prisma.websiteWatchlist.findUnique({
      select: { id: true },
      where: {
        userId_websiteId: {
          userId: authUser?.id!,
          websiteId: websiteId,
        },
      },
    });

    if (isAlreadyWatchlisted) {
      return next(httpErrors.Conflict("Already Website is Watchlisted"));
    }

    const response = await prisma.websiteWatchlist.create({
      data: { userId: authUser?.id!, websiteId },
    });

    logger.info(
      "controller - websiteWatchlist.controller - addNewWebsiteWatchlistController - end",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 201,
      message: "Website is watchlisted successfully",
      data: response,
    });
  } catch (error) {
    logger.error(
      "controller - websiteWatchlist.controller - addNewWebsiteWatchlistController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

export const getAllWebsiteWatchlistsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - websiteWatchlist.controller - getAllWebsiteWatchlistsController - start",
    );

    const authUser = req.authUser;

    let {
      sortBy = "desc",
      title,
      page = "1",
      limit = "20",
    }: {
      sortBy?: SortOrder;
      title?: string;
      page?: string | number;
      limit?: string | number;
    } = req.query;

    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Number(limit));
    const skip = (pageNumber - 1) * limitNumber;

    const where: WebsiteWatchlistWhereInput = {
      userId: authUser?.id,
    };

    if (title) {
      where.website = {
        title: {
          contains: String(title),
          mode: "insensitive",
        },
      };
    }

    const [watchlists, totalCount] = await Promise.all([
      await prisma.websiteWatchlist.findMany({
        where,
        select: {
          id: true,

          website: {
            select: {
              id: true,
              slug: true,
              title: true,
              description: true,
              url: true,
              imageUrl: true,
              iconUrl: true,
            },
          },
        },
        orderBy: {
          created_at: sortBy,
        },
        skip,
        take: limitNumber,
      }),
      prisma.websiteWatchlist.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limitNumber);

    const data = {
      page: pageNumber,
      limit: limitNumber,
      totalCount,
      totalPages,
      hasNext: pageNumber < totalPages,
      hasPrevious: pageNumber > 1,
      watchlists,
    };

    logger.info(
      "controller - websiteWatchlist.controller - getAllWebsiteWatchlistsController - end",
    );

    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Watchlisted websites fetched successfully",
      data,
    });
  } catch (error) {
    logger.error(
      "controller - websiteWatchlist.controller - getAllWebsiteWatchlistsController - error",
      error,
    );

    errorHandling.handlingControllersError(error as AppError, next);
  }
};

export const deleteWebsiteWatchlistController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - websiteWatchlist.controller - deleteWebsiteWatchlistController - start",
    );

    const { id } = req.params;
    const authUser = req.authUser;

    const watchlist = await prisma.websiteWatchlist.findFirst({
      select: {
        id: true,
      },
      where: {
        id,
        userId: authUser?.id!,
      },
    });

    if (!watchlist) {
      return next(httpErrors.NotFound("Watchlist item not found"));
    }

    await prisma.websiteWatchlist.delete({
      where: {
        id,
      },
    });

    logger.info(
      "controller - websiteWatchlist.controller - deleteWebsiteWatchlistController - end",
    );

    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Website removed from watchlist successfully",
    });
  } catch (error) {
    logger.error(
      "controller - websiteWatchlist.controller - deleteWebsiteWatchlistController - error",
      error,
    );

    errorHandling.handlingControllersError(error as AppError, next);
  }
};
