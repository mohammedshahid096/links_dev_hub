import { Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByidController,
} from "../controllers/category.controller";
import { roles } from "../constants/index.constants";

const categoryRoutes = Router();

categoryRoutes
  .route("/")
  .get(getAllCategoriesController)
  .post(authentication, authorization([roles.ADMIN]), createCategoryController);

categoryRoutes.route("/:id").get(getCategoryByidController);

export default categoryRoutes;
