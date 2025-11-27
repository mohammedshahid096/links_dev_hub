import express, { Application, Request, Response } from "express";
import corsConfig from "./src/configs/cors.config";
import helmetConfig from "./src/configs/helmet.config";

const app: Application = express();

// configs using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(corsConfig);
app.use(helmetConfig);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
