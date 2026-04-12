import { Router } from "express";
import {
  authentication,
  authorization,
  devAuthentication,
} from "../middlewares/auth.middleware";
import { roles } from "../constants/index.constants";
import {
  addNewWebsiteByUrlController,
  createWebsiteController,
  deleteWebsiteController,
  getAllWebsitesController,
  getSingleWebsiteBySlugController,
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
    createWebsiteController,
  );
websiteRoutes.route("/slug/:slug").get(getSingleWebsiteBySlugController);

websiteRoutes
  .route("/:id")
  .delete(
    authentication,
    authorization([roles.ADMIN]),
    deleteWebsiteController,
  );

websiteRoutes
  .route("/add-by-website")
  .post(
    devAuthentication,
    authorization([roles.ADMIN]),
    addNewWebsiteByUrlController,
  );

export default websiteRoutes;
