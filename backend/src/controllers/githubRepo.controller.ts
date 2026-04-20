import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import httpErrors from "http-errors";
import { fetchGithubRepoData, parseGithubUrl } from "../helpers/github.helper";

// create github repo controller
export const createGithubRepoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - githubRepo.controller - createGithubRepoController - start",
    );

    const {
      repoId,
      username,
      repoName,
      description = null,
      url,
      language = null,
      topics = [],
      isActive = true,
      websiteId = null,
    } = req.body;

    // Check for duplicate repoId
    const existingRepo = await prisma.githubRepo.findUnique({
      where: { repoId },
    });
    if (existingRepo) {
      return next(
        httpErrors.Conflict("A GitHub repo with this repoId already exists"),
      );
    }

    const data = {
      repoId,
      username,
      repoName,
      url,
      topics,
      isActive,
      created_by: req.authUser?.id!,
      ...(description && { description }),
      ...(language && { language }),
      ...(websiteId && { websiteId }),
    };

    const response = await prisma.githubRepo.create({ data });

    logger.info(
      "controller - githubRepo.controller - createGithubRepoController - end",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 201,
      message: "GitHub repo created successfully",
      data: response,
    });
  } catch (error) {
    logger.error(
      "controller - githubRepo.controller - createGithubRepoController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// get all github repos controller
export const getAllGithubReposController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - githubRepo.controller - getAllGithubReposController - start",
    );

    const repos = await prisma.githubRepo.findMany({
      orderBy: { created_at: "desc" },
    });

    logger.info(
      "controller - githubRepo.controller - getAllGithubReposController - end",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "GitHub repos fetched successfully",
      data: repos,
    });
  } catch (error) {
    logger.error(
      "controller - githubRepo.controller - getAllGithubReposController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// get github repo by id controller
export const getGithubRepoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - githubRepo.controller - getGithubRepoByIdController - start",
    );

    const { id } = req.params;

    const repo = await prisma.githubRepo.findFirst({
      where: { id },
    });

    if (!repo) {
      return next(httpErrors.NotFound("GitHub repo not found"));
    }

    logger.info(
      "controller - githubRepo.controller - getGithubRepoByIdController - end",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "GitHub repo fetched successfully",
      data: repo,
    });
  } catch (error) {
    logger.error(
      "controller - githubRepo.controller - getGithubRepoByIdController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// update github repo controller
export const updateGithubRepoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - githubRepo.controller - updateGithubRepoController - start",
    );

    const { id } = req.params;
    const { repoId } = req.body;

    // If repoId is being updated, check for conflicts
    if (repoId !== undefined) {
      const existingRepo = await prisma.githubRepo.findUnique({
        where: { repoId },
      });
      if (existingRepo && existingRepo.id !== id) {
        return next(
          httpErrors.Conflict("A GitHub repo with this repoId already exists"),
        );
      }
    }

    const updatedRepo = await prisma.githubRepo.update({
      where: { id },
      data: { ...req.body },
    });

    logger.info(
      "controller - githubRepo.controller - updateGithubRepoController - end",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "GitHub repo updated successfully",
      data: updatedRepo,
    });
  } catch (error) {
    logger.error(
      "controller - githubRepo.controller - updateGithubRepoController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// delete github repo controller
export const deleteGithubRepoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - githubRepo.controller - deleteGithubRepoController - start",
    );

    const { id } = req.params;

    const deletedRepo = await prisma.githubRepo.delete({
      where: { id },
    });

    logger.info(
      "controller - githubRepo.controller - deleteGithubRepoController - end",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "GitHub repo deleted successfully",
      data: deletedRepo,
    });
  } catch (error) {
    logger.error(
      "controller - githubRepo.controller - deleteGithubRepoController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

// ─────────────────────────────────────────────
// Add GitHub Repo by Link Controller
// POST /github-repos/by-link
// Body: { repoUrl: string, websiteId?: string }
// ─────────────────────────────────────────────
export const addGithubRepoByLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - githubRepo.controller - addGithubRepoByLinkController - start",
    );

    const { repoUrl, websiteId = null } = req.body;

    // 1. Parse the GitHub URL
    const parsed = parseGithubUrl(repoUrl);
    if (!parsed) {
      return next(
        httpErrors.BadRequest(
          "Invalid GitHub URL. Expected format: https://github.com/username/repo-name",
        ),
      );
    }

    const { username, repoName } = parsed;

    // 2. Fetch repo data from GitHub API
    logger.info(
      `controller - githubRepo.controller - addGithubRepoByLinkController - fetching GitHub data for ${username}/${repoName}`,
    );

    let githubData: any;
    try {
      githubData = await fetchGithubRepoData(username, repoName);
    } catch (err) {
      logger.error(
        "controller - githubRepo.controller - addGithubRepoByLinkController - GitHub API fetch failed",
        err,
      );
      return next(
        httpErrors.BadGateway(
          "Failed to reach GitHub API. Please try again later.",
        ),
      );
    }

    if (!githubData) {
      return next(
        httpErrors.NotFound(
          "GitHub repository not found. It may be private or the URL is incorrect.",
        ),
      );
    }

    // 3. Check if repo already exists (by GitHub's numeric repoId)
    const existingRepo = await prisma.githubRepo.findUnique({
      where: { repoId: githubData.id },
    });
    if (existingRepo) {
      return next(
        httpErrors.Conflict("This GitHub repository has already been added."),
      );
    }

    // 4. Map GitHub API response → our schema
    const data = {
      repoId: githubData.id, // Int  — GitHub's unique numeric ID
      username: githubData.owner?.login ?? username, // repo owner login
      repoName: githubData.name, // repo name (as GitHub stores it)
      url: githubData.html_url, // canonical HTML URL
      description: githubData.description ?? null,
      language: githubData.language ?? null,
      topics: githubData.topics ?? [], // string[]
      isActive: true,
      created_by: req.authUser?.id!,
      ...(websiteId && { websiteId }),
    };

    // 5. Persist
    const response = await prisma.githubRepo.create({ data });

    logger.info(
      "controller - githubRepo.controller - addGithubRepoByLinkController - end",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 201,
      message: "GitHub repo added successfully",
      data: response,
    });
  } catch (error) {
    logger.error(
      "controller - githubRepo.controller - addGithubRepoByLinkController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
