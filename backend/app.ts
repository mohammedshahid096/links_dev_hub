import express, { Application } from "express";
import corsConfig from "./src/configs/cors.config";
import helmetConfig from "./src/configs/helmet.config";
import {
  getAllUsersController,
  getAllCategoryController,
} from "./src/controllers";

const app: Application = express();

// configs using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(corsConfig);
app.use(helmetConfig);

app.get("/users", getAllUsersController);
app.get("/categories", getAllCategoryController);

export default app;
