import { Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByidController,
} from "../controllers/category.controller";
import { roles } from "../constants/index.constants";
import { createCategoryValidation } from "../validations/category.joi";

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

categoryRoutes.route("/:id").get(getCategoryByidController);

export default categoryRoutes;
