import { Router } from "express";
import { clerkWebhookEventController } from "../controllers/clerk.controller";
import { rawBodyMiddleware } from "../middlewares/rawBody.middleware";

const clerkRoutes = Router();

clerkRoutes.route("/").post(rawBodyMiddleware, clerkWebhookEventController);

export default clerkRoutes;
