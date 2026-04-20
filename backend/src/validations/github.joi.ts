import { celebrate, Joi } from "celebrate";

export const createGithubRepoValidation = celebrate({
  body: Joi.object({
    repoId: Joi.number().integer().required(),
    username: Joi.string().max(100).required(),
    repoName: Joi.string().max(200).required(),
    description: Joi.string().max(1000).optional(),
    url: Joi.string().uri().max(255).required(),
    language: Joi.string().max(50).optional(),
    topics: Joi.array().items(Joi.string().max(100)).default([]),
    isActive: Joi.boolean().default(true),
    websiteId: Joi.string().uuid().optional(),
  })
    .required()
    .label("body"),
});

export const updateGithubRepoValidation = celebrate({
  body: Joi.object({
    repoId: Joi.number().integer().optional(),
    username: Joi.string().max(100).optional(),
    repoName: Joi.string().max(200).optional(),
    description: Joi.string().max(1000).optional(),
    url: Joi.string().uri().max(255).optional(),
    language: Joi.string().max(50).optional(),
    topics: Joi.array().items(Joi.string().max(100)).optional(),
    isActive: Joi.boolean().optional(),
    websiteId: Joi.string().uuid().optional(),
  })
    .required()
    .label("body"),
});

export const addGithubRepoByLinkValidation = celebrate({
  body: Joi.object({
    repoUrl: Joi.string()
      .uri()
      .pattern(/^https?:\/\/(www\.)?github\.com\/[^/]+\/[^/]+/)
      .required()
      .messages({
        "string.pattern.base":
          "repoUrl must be a valid GitHub repository URL (e.g. https://github.com/username/repo)",
      }),
    websiteId: Joi.string().uuid().optional(),
  })
    .required()
    .label("body"),
});
