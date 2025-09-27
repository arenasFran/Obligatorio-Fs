import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeaders = req.headers["authorization"];

  if (!authHeaders) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const token = authHeaders.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    } else {
      // Asegura que el campo sea _id para compatibilidad con Mongoose
      req.user = { username: user.username, _id: user.id };
      next();
    }
  });
};
