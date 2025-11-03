import { jwtService } from "../SERVICES/jwt.service.js";

export const requireAppToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ error: "AppToken requerido en el header" });
  }

  const token = header.split(" ")[1];
  const decoded = jwtService.verifyAppToken(token);

  if (!decoded) {
    return res.status(403).json({ error: "AppToken inválido o no autorizado" });
  }

  req.appData = decoded; // opcional: se pasa al controller si lo necesitas
  next();
};
