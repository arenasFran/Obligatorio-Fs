import Joi from "joi";


export const quoteSchema = Joi.object({
  libraryItem: Joi.string().hex().length(24).required().messages({
    "string.base": "El libraryItem debe ser un ID válido",
    "string.hex": "El libraryItem debe ser un ObjectId válido",
    "string.length": "El libraryItem debe tener 24 caracteres",
    "any.required": "El libraryItem es obligatorio",
  }),
  pag: Joi.number().integer().min(1).required().messages({
    "number.base": "La página debe ser un número",
    "number.integer": "La página debe ser un número entero",
    "number.min": "La página debe ser mayor a 0",
    "any.required": "La página es obligatoria",
  }),
  content: Joi.string().required().messages({
    "string.base": "El contenido debe ser un texto",
    "string.empty": "El contenido es obligatorio",
    "any.required": "El contenido es obligatorio",
  }),
  isFavorite: Joi.boolean().optional(),
});

export const quoteEditSchema = Joi.object({
  pag: Joi.number().integer().min(1).optional().messages({
    "number.base": "La página debe ser un número",
    "number.integer": "La página debe ser un número entero",
    "number.min": "La página debe ser mayor a 0"
  }),
  content: Joi.string().optional().messages({
    "string.base": "El contenido debe ser un texto",
    "string.empty": "El contenido es obligatorio"
  }),
  isFavorite: Joi.boolean().optional()
});
