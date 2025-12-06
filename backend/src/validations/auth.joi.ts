import { celebrate, Joi } from "celebrate";

export const registerAuthValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
      .required()
      .label("password")
      .messages({
        "string.pattern.base": `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
      }),
  })
    .required()
    .label("boby"),
});

export const loginAuthValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
      .required()
      .label("password")
      .messages({
        "string.pattern.base": `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
      }),
  })
    .required()
    .label("body"),
});
