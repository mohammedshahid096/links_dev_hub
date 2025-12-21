import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import httpErrors from "http-errors";
import slugify from "slugify";

// create website controller
export const createWebsiteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - website.controller - createWebsiteController - start"
    );
    const { title } = req.body;
    const slug = slugify(title, { lower: true, strict: true, trim: true });

    let isExistingWebsite = await prisma.website.findUnique({
      where: {
        slug,
      },
    });

    if (isExistingWebsite) {
      return next(
        httpErrors.Conflict("Website with this title already exists")
      );
    }

    let websiteDetails = { ...req.body, slug, created_by: req.authUser?.id };

    const createdWebsite = await prisma.website.create({
      data: websiteDetails,
    });
    logger.info(
      "controller - website.controller - createWebsiteController - end"
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 201,
      message: "Website created successfully",
      data: createdWebsite,
    });
  } catch (error) {
    logger.error(
      "controller - website.controller - createWebsiteController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// get all websites controller
export const getAllWebsitesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - website.controller - getAllWebsitesController - start"
    );
    const websites = await prisma.website.findMany();
    logger.info(
      "controller - website.controller - getAllWebsitesController - end"
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Websites fetched successfully",
      data: websites,
    });
  } catch (error) {
    logger.error(
      "controller - website.controller - getAllWebsitesController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// get single website controller
export const getSingleWebsiteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - website.controller - getSingleWebsiteController - start"
    );
    const { id } = req.params;
    const website = await prisma.website.findUnique({
      where: { id },
    });

    if (!website) {
      return next(httpErrors.NotFound("Website not found"));
    }
    logger.info(
      "controller - website.controller - getSingleWebsiteController - end"
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Website fetched successfully",
      data: website,
    });
  } catch (error) {
    logger.error(
      "controller - website.controller - getSingleWebsiteController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// delete website controller
export const deleteWebsiteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - website.controller - deleteWebsiteController - start"
    );
    const { id } = req.params;
    const deletedWebsite = await prisma.website.delete({
      where: { id },
    });
    logger.info(
      "controller - website.controller - deleteWebsiteController - end"
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Website deleted successfully",
      data: deletedWebsite,
    });
  } catch (error) {
    logger.error(
      "controller - website.controller - deleteWebsiteController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
