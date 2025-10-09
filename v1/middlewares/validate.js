export function validate(schemas) {
  return async (req, res, next) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.validateAsync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });
      }
      if (schemas.params) {
        req.params = await schemas.params.validateAsync(req.params, {
          abortEarly: false,
          stripUnknown: true,
        });
      }
      if (schemas.query) {
        req.query = await schemas.query.validateAsync(req.query, {
          abortEarly: false,
          stripUnknown: true,
        });
      }
      return next();
    } catch (err) {
      const msg = err.details?.[0]?.message ?? err.message;
      return res.status(400).json({ error: msg });
    }
  };
}
