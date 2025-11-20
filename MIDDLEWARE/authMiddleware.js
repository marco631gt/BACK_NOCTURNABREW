import { jwtService } from "../SERVICES/jwt.service.js";

//AppToken
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
    return res
      .status(403)
      .json({ error: "AppToken inválido o no autorizado" });
  }

  req.appData = decoded;
  next();
};

//UserToken
export const requireUserToken = (req, res, next) => {
  const header = req.headers["auth-user"];

  if (!header) {
    return res.status(401).json({ error: "UserToken requerido en el header" });
  }

  const [type, token] = header.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  if (type !== "UserToken" && type !== "Bearer") {
    return res
      .status(403)
      .json({ error: "Tipo de UserToken no autorizado" });
  }

  const decoded = jwtService.verifyUserToken(token);

  if (!decoded) {
    return res
      .status(403)
      .json({ error: "UserToken inválido o no autorizado" });
  }

  req.userData = decoded;
  next();
};
