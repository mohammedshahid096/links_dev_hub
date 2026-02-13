import { Router } from "express";

const clerkRoutes = Router();

clerkRoutes.route("/").post();

export default clerkRoutes;
