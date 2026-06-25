import { celebrate, Joi } from "celebrate";

export const addNewWebsiteWatchlistValidation = celebrate({
  body: Joi.object({
    websiteId: Joi.string().required().uuid(),
  })
    .required()
    .label("body"),
});

export const getAllWebsiteWatchlistsValidation = celebrate({
  query: Joi.object({
    sortBy: Joi.string().valid("asc", "desc").default("desc"),
    title: Joi.string().trim().min(1).max(200).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
  }).label("query"),
});
