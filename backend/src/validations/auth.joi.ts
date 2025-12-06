import { celebrate, Joi } from "celebrate";

export const registerAuthValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(18).required(),
  })
    .required()
    .label("boby"),
});
