const express = require("express");
const {
  loginUserController,
  testController,
} = require("../../controllers/users/user.controller");
const { loginUserValidation } = require("../../validators/users/user.joi");

const UserRoutes = express.Router();

UserRoutes.route("/login").post(loginUserValidation, loginUserController);
UserRoutes.route("/test").get(testController);

module.exports = UserRoutes;
