import express, { Application } from "express";
// configs
import corsConfig from "./src/configs/cors.config";
import helmetConfig from "./src/configs/helmet.config";
import ratelimitConfig from "./src/configs/ratelimit.config";
import config from "./src/configs/index.config";
import morganConfigFunction from "./src/configs/morgan.config";
import compressionConfig from "./src/configs/compression.config";
// routes
import IndexRoutes from "./src/routes/index.routes";

const app: Application = express();

// configs using middlewares
app.use(ratelimitConfig);
app.use(compressionConfig);
app.use(express.json());
app.use(helmetConfig);
app.use(corsConfig);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
if (config.DEVELOPMENT_MODE === "development") {
  app.use(morganConfigFunction());
}

app.use(IndexRoutes);

export default app;
