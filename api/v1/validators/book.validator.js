import Joi from "joi";

export const bookSchema = Joi.object({
  ownerId: Joi.string().required(),
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  categoryId: Joi.string().required(),
});
