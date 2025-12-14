import { celebrate, Joi } from "celebrate";

export const createCategoryValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
  })
    .required()
    .label("boby"),
});
