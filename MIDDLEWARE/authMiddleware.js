import { jwtService } from "../SERVICES/jwt.service.js";

export const requireAppToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ error: "AppToken requerido en el header" });
  }

  const [type, token] = header.split(" ");
  if (!token) {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  if (type !== "AppToken" && type !== "Bearer") {
    return res.status(403).json({ error: "Tipo de token no autorizado" });
  }

  const decoded = jwtService.verifyAppToken(token);
  if (!decoded) {
    return res.status(403).json({ error: "AppToken inválido o no autorizado" });
  }

  req.appData = decoded;
  next();
};
