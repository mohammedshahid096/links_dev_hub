const express = require("express");
const compression = require("compression");
let moment = require("moment-timezone");
const { DEVELOPMENT_MODE } = require("./src/config/index.config");
const ratelimitConfig = require("./src/config/ratelimit.config");
const corsConfig = require("./src/config/cors.config");
const morganConfigFunction = require("./src/config/morgan.config");
const helmetConfig = require("./src/config/helmet.config");
const errorHandling = require("./src/utils/errorHandling");
const IndexRoutes = require("./src/routes/index.route");

const app = express();

//----------------------------------------
//------------ config --------------------
//----------------------------------------

if (DEVELOPMENT_MODE === "development") {
  app.use(morganConfigFunction());
}

app.use(helmetConfig);
app.use(ratelimitConfig);
app.use(compression({ level: 6 }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(corsConfig);
moment.tz.setDefault("Asia/Kolkata");

// Routes
app.use(IndexRoutes);

// response for error message
app.use((err, req, res, next) => {
  errorHandling.handleMainErrorService(err, res);
});

module.exports = app;
