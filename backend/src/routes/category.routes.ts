import { Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryByidController,
  updateCategoryController,
} from "../controllers/category.controller";
import { roles } from "../constants/index.constants";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../validations/category.joi";

const categoryRoutes = Router();

categoryRoutes
  .route("/")
  .get(getAllCategoriesController)
  .post(
    authentication,
    authorization([roles.ADMIN]),
    createCategoryValidation,
    createCategoryController
  );

categoryRoutes
  .route("/:id")
  .get(getCategoryByidController)
  .put(
    authentication,
    authorization([roles.ADMIN]),
    updateCategoryValidation,
    updateCategoryController
  )
  .delete(
    authentication,
    authorization([roles.ADMIN]),
    deleteCategoryController
  );

export default categoryRoutes;
