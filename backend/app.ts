import express, { Application } from "express";
import corsConfig from "./src/configs/cors.config";
import helmetConfig from "./src/configs/helmet.config";
import ratelimitConfig from "./src/configs/ratelimit.config";
import {
  getAllUsersController,
  getAllCategoryController,
} from "./src/controllers";
import config from "./src/configs/index.config";
import morganConfigFunction from "./src/configs/morgan.config";

const app: Application = express();

// configs using middlewares
app.use(ratelimitConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(corsConfig);
app.use(helmetConfig);
if (config.DEVELOPMENT_MODE === "development") {
  app.use(morganConfigFunction());
}

app.get("/users", getAllUsersController);
app.get("/categories", getAllCategoryController);

export default app;
