import { Router } from "express";
import authRoutes from "./auth.routes";

const apiV1Routes = Router();

apiV1Routes.use("/auth", authRoutes);

export default apiV1Routes;
