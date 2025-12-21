import { Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";
import { roles } from "../constants/index.constants";
import {
  createWebsiteController,
  deleteWebsiteController,
  getAllWebsitesController,
  getSingleWebsiteController,
} from "../controllers/website.controller";
import { createWebsiteValidation } from "../validations/website.joi";

const websiteRoutes = Router();

websiteRoutes
  .route("/")
  .get(getAllWebsitesController)
  .post(
    authentication,
    authorization([roles.ADMIN]),
    createWebsiteValidation,
    createWebsiteController
  );

websiteRoutes
  .route("/:id")
  .get(getSingleWebsiteController)
  .delete(
    authentication,
    authorization([roles.ADMIN]),
    deleteWebsiteController
  );

export default websiteRoutes;
