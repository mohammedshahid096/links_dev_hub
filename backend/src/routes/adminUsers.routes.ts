import { Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";
import { roles } from "../constants/index.constants";
import { getAllUsersController } from "../controllers/adminUsers.controller";

const adminUserRoutes = Router();

adminUserRoutes
  .route("/")
  .get(authentication, authorization([roles.ADMIN]), getAllUsersController);

export default adminUserRoutes;
