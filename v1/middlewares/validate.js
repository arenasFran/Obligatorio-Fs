export function validate(schemas) {
  return async (req, res, next) => {
    try {
      if (schemas.body) {
        const value = await schemas.body.validateAsync(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (req.body && typeof req.body === "object") {
          for (const k of Object.keys(req.body)) delete req.body[k];
          Object.assign(req.body, value);
        } else {
          req.body = value;
        }
      }
      if (schemas.params) {
        const value = await schemas.params.validateAsync(req.params, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (req.params && typeof req.params === "object") {
          for (const k of Object.keys(req.params)) delete req.params[k];
          Object.assign(req.params, value);
        } else {
          req.params = value;
        }
      }
      if (schemas.query) {
        const value = await schemas.query.validateAsync(req.query, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (req.query && typeof req.query === "object") {
          for (const k of Object.keys(req.query)) delete req.query[k];
          Object.assign(req.query, value);
        } else {
          req.validated = Object.assign({}, req.validated, { query: value });
        }
      }
      return next();
    } catch (err) {
      const msg = err.details?.[0]?.message ?? err.message;
      return res.status(400).json({ error: msg });
    }
  };
}
