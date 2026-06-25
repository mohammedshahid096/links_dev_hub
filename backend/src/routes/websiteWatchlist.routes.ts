import { Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";
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
    authentication,
    authorization([roles.USER]),
    getAllWebsiteWatchlistsController,
  )
  .post(
    authentication,
    authorization([roles.USER]),
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
