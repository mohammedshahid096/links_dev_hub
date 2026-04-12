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
export const createWebsiteByUrlValidation = celebrate({
  body: Joi.object({
    url: Joi.string().uri().required(),
    categoryId: Joi.string().uuid().required(),
  })
    .required()
    .label("body"),
});

export const updateWebsiteValidation = celebrate({
  body: Joi.object({
    title: Joi.string().min(3).optional(),
    description: Joi.string().min(3).optional(),
    imageUrl: Joi.string().uri().optional(),
    iconUrl: Joi.string().uri().max(200).optional(),
    tags: Joi.array().items(Joi.string().max(200)).optional(),
    keywords: Joi.array().items(Joi.string().max(500)).optional(),
    provider: Joi.string().max(100).optional().allow(null),
    author: Joi.string().max(100).optional().allow(null),
    categoryId: Joi.string().uuid().optional(),
    isActive: Joi.boolean().optional(),
    sourceType: Joi.string().optional().allow(null),
  }),
});
