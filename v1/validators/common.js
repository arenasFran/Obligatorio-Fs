import Joi from "joi";

// Reusable ObjectId string validator
export const objectId = Joi.string().hex().length(24);

// Single param schema: objectIdParam('id') => { id: ObjectId }
export const objectIdParam = (name = "id") =>
  Joi.object({ [name]: objectId.required() });

// Multiple params schema: objectIdParams('itemId','collectionId')
export const objectIdParams = (...names) =>
  Joi.object(Object.fromEntries(names.map((n) => [n, objectId.required()])));

export default {
  objectId,
  objectIdParam,
  objectIdParams,
};
