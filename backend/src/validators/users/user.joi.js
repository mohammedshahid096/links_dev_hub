const { celebrate, Joi } = require("celebrate");

// register joi validation
const registerUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().email().required().label("email"),
    // password: passwordComplexity().required().label("password"),
  }),
});

// login joi validation
const loginUserValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().label("email"),
    // password: passwordComplexity().required().label("password"),
  }),
});

module.exports = {
  loginUserValidation,
  registerUserValidation,
};
