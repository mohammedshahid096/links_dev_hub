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
  getAllWebsiteNamesController,
  getAllWebsitesController,
  getSingleWebsiteBySlugController,
  updateWebsiteController,
} from "../controllers/website.controller";
import {
  createWebsiteByUrlValidation,
  createWebsiteValidation,
  updateWebsiteValidation,
} from "../validations/website.joi";

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
  .put(
    authentication,
    authorization([roles.ADMIN]),
    updateWebsiteValidation,
    updateWebsiteController,
  )
  .delete(
    authentication,
    authorization([roles.ADMIN]),
    deleteWebsiteController,
  );

websiteRoutes
  .route("/add-by-website")
  .post(
    authentication,
    authorization([roles.ADMIN]),
    createWebsiteByUrlValidation,
    addNewWebsiteByUrlController,
  );

websiteRoutes
  .route("/all-titiles")
  .get(
    devAuthentication,
    authorization([roles.ADMIN]),
    getAllWebsiteNamesController,
  );

export default websiteRoutes;
