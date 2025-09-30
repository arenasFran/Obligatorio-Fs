import Joi from "joi";

export const libraryItemSchema = Joi.object({
  titulo: Joi.string().required().messages({
    "string.base": "El título debe ser un texto",
    "string.empty": "El título es obligatorio",
    "any.required": "El título es obligatorio",
  }),
  coverUrl: Joi.string().uri().optional().messages({
    "string.base": "La URL de la portada debe ser un texto",
    "string.uri": "La URL de la portada debe ser válida",
  }),
  category: Joi.string().optional().messages({
    "string.base": "La categoría debe ser un texto",
  }),
  authors: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      "array.base": "Los autores deben ser un arreglo de textos",
      "array.min": "Debe haber al menos un autor",
      "any.required": "Los autores son obligatorios",
    }),
  desc: Joi.string().optional().messages({
    "string.base": "La descripción debe ser un texto",
  }),
  estado: Joi.string()
    .valid("NONE", "LEYENDO", "TERMINADO")
    .required()
    .messages({
      "string.base": "El estado debe ser un texto",
      "any.only": "El estado debe ser NONE, LEYENDO o TERMINADO",
      "any.required": "El estado es obligatorio",
    }),

 
  progreso: Joi.number().integer().min(0).optional().messages({
    "number.base": "El progreso debe ser un número",
    "number.integer": "El progreso debe ser un número entero",
    "number.min": "El progreso no puede ser negativo",
  }),
});
