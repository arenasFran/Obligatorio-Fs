import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'El nombre de usuario debe ser un texto',
            'string.empty': 'El nombre de usuario es obligatorio',
            'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
            'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres',
            'any.required': 'El nombre de usuario es obligatorio'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
        .messages({
            'string.base': 'La contraseña debe ser un texto',
            'string.empty': 'La contraseña es obligatoria',
            'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
            'any.required': 'La contraseña es obligatoria'
        }),
    repeat_password: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Las contraseñas no coinciden',
            'any.required': 'Debe repetir la contraseña'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'El correo electrónico debe ser un texto',
            'string.email': 'El correo electrónico debe ser válido',
            'string.empty': 'El correo electrónico es obligatorio',
            'any.required': 'El correo electrónico es obligatorio'
        })
});

export const loginSchema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre de usuario debe ser un texto',
            'string.empty': 'El nombre de usuario es obligatorio',
            'any.required': 'El nombre de usuario es obligatorio'
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'La contraseña debe ser un texto',
            'string.empty': 'La contraseña es obligatoria',
            'any.required': 'La contraseña es obligatoria'
        })
});
