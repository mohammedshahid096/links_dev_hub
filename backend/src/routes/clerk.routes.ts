import { Router } from "express";
import { clerkWebhookEventController } from "../controllers/clerk.controller";

const clerkRoutes = Router();

clerkRoutes.route("/").post(clerkWebhookEventController);

export default clerkRoutes;
