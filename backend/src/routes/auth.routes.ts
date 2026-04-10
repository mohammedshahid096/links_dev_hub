import { Router } from "express";
import { profileAuthController } from "../controllers/auth.controller";

import { authentication } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.route("/profile").get(authentication, profileAuthController);

export default authRoutes;
