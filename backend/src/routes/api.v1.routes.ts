import { Router } from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import websiteRoutes from "./website.routes";
import clerkRoutes from "./clerk.routes";
import githubRepoRoutes from "./github.routes";

const apiV1Routes = Router();

// auth routes
apiV1Routes.use("/auth", authRoutes);

// category routes
apiV1Routes.use("/categories", categoryRoutes);

// website routes
apiV1Routes.use("/websites", websiteRoutes);

// clerk routes
apiV1Routes.use("/webhook/clerk", clerkRoutes);

// githubrepo
apiV1Routes.use("/github-repos", githubRepoRoutes);

export default apiV1Routes;
