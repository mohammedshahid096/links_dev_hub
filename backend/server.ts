import app from "./app";
import config from "./src/configs/index.config";

function startServer(): void {
  app.listen(config.PORT, () => {
    console.log("Server started");
    console.log("Server is Running on : http://localhost:" + config.PORT);
  });
}

startServer();
