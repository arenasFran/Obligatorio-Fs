import Joi from "joi";

export const collectionSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "El título debe ser un texto",
    "string.empty": "El título es obligatorio",
    "any.required": "El título es obligatorio",
  }),
  libraryItems: Joi.array()
    .items(Joi.string().hex().length(24))
    .optional()
    .messages({
      "array.base": "libraryItems debe ser un arreglo de IDs",
      "string.hex": "Cada libraryItem debe ser un ObjectId válido",
      "string.length": "Cada libraryItem debe tener 24 caracteres",
    }),
});

export function collectionValidation(req, res, next) {
  const { error } = collectionSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((e) => e.message) });
  }
  next();
}
