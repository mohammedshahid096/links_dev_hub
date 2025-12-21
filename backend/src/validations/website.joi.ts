import { celebrate, Joi } from "celebrate";

export const createWebsiteValidation = celebrate({
  body: Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).optional(),
    url: Joi.string().uri().required(),
    image: Joi.string().uri().max(200).optional(),
    icon: Joi.string().uri().max(200).optional(),
    tags: Joi.array().items(Joi.string().max(200)).default([]),
    keywords: Joi.array().items(Joi.string().max(500)).default([]),
    provider: Joi.string().max(100).optional(),
    author: Joi.string().max(100).optional(),
    categoryId: Joi.string().uuid().required(),
  })
    .required()
    .label("body"),
});
