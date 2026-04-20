import { Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";
import {
  createGithubRepoController,
  addGithubRepoByLinkController,
  updateGithubRepoController,
  getAllGithubReposController,
  getGithubRepoByIdController,
} from "../controllers/githubRepo.controller";
import { roles } from "../constants/index.constants";
import {
  createGithubRepoValidation,
  updateGithubRepoValidation,
  addGithubRepoByLinkValidation,
} from "../validations/github.joi";

const githubRepoRoutes = Router();

githubRepoRoutes
  .route("/")
  .get(getAllGithubReposController)
  .post(
    authentication,
    authorization([roles.ADMIN]),
    createGithubRepoValidation,
    createGithubRepoController,
  );
githubRepoRoutes
  .route("/by-link")
  .post(
    authentication,
    authorization([roles.ADMIN]),
    addGithubRepoByLinkValidation,
    addGithubRepoByLinkController,
  );
githubRepoRoutes
  .route("/:id")
  .get(getGithubRepoByIdController)
  .patch(
    authentication,
    authorization([roles.ADMIN]),
    updateGithubRepoValidation,
    updateGithubRepoController,
  );

export default githubRepoRoutes;
