import { Router } from "express";
import { registerAuthController } from "../controllers/auth.controller";
import { registerAuthValidation } from "../validations/auth.joi";

const authRoutes = Router();

authRoutes
  .route("/register")
  .post(registerAuthValidation, registerAuthController);

export default authRoutes;
