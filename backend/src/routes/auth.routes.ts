import { Router } from "express";
import {
  loginAuthController,
  registerAuthController,
} from "../controllers/auth.controller";
import {
  loginAuthValidation,
  registerAuthValidation,
} from "../validations/auth.joi";

const authRoutes = Router();

authRoutes
  .route("/register")
  .post(registerAuthValidation, registerAuthController);

authRoutes.route("/login").post(loginAuthValidation, loginAuthController);

export default authRoutes;
