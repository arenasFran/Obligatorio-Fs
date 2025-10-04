import Joi from "joi";

export const libraryItemSchema = Joi.object({
  titulo: Joi.string().required().messages({
    "string.base": "El título debe ser un texto",
    "string.empty": "El título es obligatorio",
    "any.required": "El título es obligatorio",
  }),
  subtitle: Joi.string().optional().messages({
    "string.base": "El subtítulo debe ser un texto",
  }),
  publishedDate: Joi.string().optional().messages({
    "string.base": "La fecha de publicación debe ser un texto",
  }),
  pageCount: Joi.number().integer().min(0).optional().messages({
    "number.base": "El número de páginas debe ser un número",
    "number.integer": "El número de páginas debe ser entero",
    "number.min": "El número de páginas no puede ser negativo",
  }),
  coverUrl: Joi.string().uri().optional().messages({
    "string.base": "La URL de la portada debe ser un texto",
    "string.uri": "La URL de la portada debe ser válida",
  }),
  categories: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Las categorías deben ser un arreglo de textos",
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
  collectionId: Joi.string().required().messages({
    "string.base": "El collectionId debe ser un texto",
    "string.empty": "El collectionId es obligatorio",
    "any.required": "El collectionId es obligatorio",
  }),

  progreso: Joi.number().integer().min(0).optional().messages({
    "number.base": "El progreso debe ser un número",
    "number.integer": "El progreso debe ser un número entero",
    "number.min": "El progreso no puede ser negativo",
  }),
  originalBookId: Joi.string().required().messages({
    "string.base": "El originalBookId debe ser un texto",
    "string.empty": "El originalBookId es obligatorio",
    "any.required": "El originalBookId es obligatorio",
  }),
});
