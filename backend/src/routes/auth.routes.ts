import { Router } from "express";
import {
  loginAuthController,
  profileAuthController,
  registerAuthController,
} from "../controllers/auth.controller";
import {
  loginAuthValidation,
  registerAuthValidation,
} from "../validations/auth.joi";
import { authentication } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes
  .route("/register")
  .post(registerAuthValidation, registerAuthController);

authRoutes.route("/login").post(loginAuthValidation, loginAuthController);
authRoutes.route("/profile").get(authentication, profileAuthController);

export default authRoutes;
