import Joi from 'joi';

export const createReviewSchema = Joi.object({
  originalBookId: Joi.string()
    .required()
    .messages({
      'string.empty': 'El ID del libro es requerido',
      'any.required': 'El ID del libro es requerido'
    }),
    
  bookTitle: Joi.string()
    .required()
    .messages({
      'string.empty': 'El título del libro es requerido',
      'any.required': 'El título del libro es requerido'
    }),

  score: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({
      'number.base': 'El puntaje debe ser un número',
      'number.integer': 'El puntaje debe ser un número entero', 
      'number.min': 'El puntaje mínimo es 1',
      'number.max': 'El puntaje máximo es 5',
      'any.required': 'El puntaje es requerido'
    }),
    
  comment: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'El comentario es requerido',
      'string.min': 'El comentario debe tener al menos 10 caracteres',
      'string.max': 'El comentario no puede exceder 1000 caracteres',
      'any.required': 'El comentario es requerido'
    })
});

export const updateReviewSchema = Joi.object({  
  score: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .optional(),
    
  comment: Joi.string()
    .min(10)
    .max(1000)
    .optional(),

  bookTitle: Joi.string().optional() 
});
