import { Router } from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import websiteRoutes from "./website.routes";

const apiV1Routes = Router();

// auth routes
apiV1Routes.use("/auth", authRoutes);

// category routes
apiV1Routes.use("/categories", categoryRoutes);

// website routes
apiV1Routes.use("/websites", websiteRoutes);

export default apiV1Routes;
