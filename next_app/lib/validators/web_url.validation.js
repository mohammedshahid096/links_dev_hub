import Joi from "joi";

export const addNewWebUrlSchema = (body) => {
  const schema = Joi.object({
    url: Joi.string(),
  });

  return schema.validate(body);
};
