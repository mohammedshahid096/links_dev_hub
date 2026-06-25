import { Router } from "express";
import {
  authentication,
  authorization,
  devAuthentication,
} from "../middlewares/auth.middleware";
import { roles } from "../constants/index.constants";
import { addNewWebsiteWatchlistValidation } from "../validations/websiteWatchlist.joi";
import {
  addNewWebsiteWatchlistController,
  deleteWebsiteWatchlistController,
  getAllWebsiteWatchlistsController,
} from "../controllers/websiteWatchlist.controller";

const websiteWatchlistRoutes = Router();

websiteWatchlistRoutes
  .route("/")
  .get(
    // authentication,
    // authorization([roles.USER]),
    devAuthentication,
    getAllWebsiteWatchlistsController,
  )
  .post(
    // authentication,
    // authorization([roles.USER]),
    devAuthentication,
    addNewWebsiteWatchlistValidation,
    addNewWebsiteWatchlistController,
  );

websiteWatchlistRoutes
  .route("/:id")
  .delete(
    authentication,
    authorization([roles.USER]),
    deleteWebsiteWatchlistController,
  );

export default websiteWatchlistRoutes;
