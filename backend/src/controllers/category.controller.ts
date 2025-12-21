import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import httpErrors from "http-errors";
import slugify from "slugify";
import { CategoryType } from "../types/category.type";

// create category controller
export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - category.controller - createCategoryController - start"
    );
    const { name, description = null } = req.body;
    const slug = slugify(name, { lower: true, strict: true, trim: true });
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });
    if (existingCategory) {
      return next(
        httpErrors.Conflict("Category with this name already exists")
      );
    }

    let data = {
      name,
      slug,
      createdBy: req.authUser?.id!,
    };

    // if (description) {
    //   data.description = description;
    // }

    const response = await prisma.category.create({
      data: {
        name,
        slug,
        createdBy: req.authUser?.id!,
      },
    });
    logger.info(
      "controller - category.controller - createCategoryController - end"
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 201,
      message: "Category created successfully",
      data: response,
    });
  } catch (error) {
    logger.error(
      "controller - category.controller - createCategoryController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// get all categories controller
export const getAllCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - category.controller - getAllCategoriesController - start"
    );
    const categories = await prisma.category.findMany();

    logger.info(
      "controller - category.controller - getAllCategoriesController - end"
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    logger.error(
      "controller - category.controller - getAllCategoriesController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// get category by id/slug controller
export const getCategoryByidController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - category.controller - getCategoryByidController - start"
    );
    const { id } = req.params;
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });
    if (!category) {
      return next(httpErrors.NotFound("Category not found"));
    }
    logger.info(
      "controller - category.controller - getCategoryByidController - end"
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    logger.error(
      "controller - category.controller - getCategoryByidController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// update category controller
export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - category.controller - updateCategoryController - start"
    );
    const { id } = req.params;
    const { name } = req.body;
    let existingCategory = null;
    let slug = null;
    let updateDetails: Partial<CategoryType> = { ...req.body };
    if (name) {
      const slug = slugify(name, { lower: true, strict: true, trim: true });
      existingCategory = await prisma.category.findUnique({
        where: { slug },
      });
      updateDetails.slug = slug;
    }

    if (existingCategory && existingCategory.id !== id) {
      return next(
        httpErrors.Conflict("Category with this name already exists")
      );
    }
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: updateDetails,
    });
    logger.info(
      "controller - category.controller - updateCategoryController - end"
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    logger.error(
      "controller - category.controller - updateCategoryController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// delete category controller
export const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controller - category.controller - deleteCategoryController - start"
    );
    const { id } = req.params;
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    logger.info(
      "controller - category.controller - deleteCategoryController - end"
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    logger.error(
      "controller - category.controller - deleteCategoryController - error",
      error
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
