import { Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";
import {
  createCategoryController,
  getAllCategoriesController,
} from "../controllers/category.controller";
import { roles } from "../constants/index.constants";

const categoryRoutes = Router();

categoryRoutes
  .route("/")
  .get(getAllCategoriesController)
  .post(authentication, authorization([roles.ADMIN]), createCategoryController);

export default categoryRoutes;
