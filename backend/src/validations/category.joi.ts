import { celebrate, Joi } from "celebrate";

export const createCategoryValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(255).optional(),
    isActive: Joi.boolean().default(true),
  })
    .required()
    .label("boby"),
});

export const updateCategoryValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    description: Joi.string().max(255).optional(),
    isActive: Joi.boolean().optional(),
  })
    .required()
    .label("body"),
});
