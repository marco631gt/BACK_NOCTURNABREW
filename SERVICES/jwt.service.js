import jwt from "jsonwebtoken";
import { tokenJWT } from "../CONFIG/config.js";

export const jwtService = {
  generatePermanentAppToken(payload = { app: "MyApp" }) {
    return jwt.sign(payload, tokenJWT.jwt.appSecret);
  },

  verifyAppToken(token) {
    try {
      return jwt.verify(token, tokenJWT.jwt.appSecret);
    } catch {
      return null;
    }
  }
};
