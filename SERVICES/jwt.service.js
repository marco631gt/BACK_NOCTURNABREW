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
  },
  
  generateUserToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      tokenJWT.jwt.userSecret,
      { expiresIn: "1d" }
    );
  },

  verifyUserToken(token) {
    try {
      return jwt.verify(token, tokenJWT.jwt.userSecret);
    } catch {
      return null;
    }
  },
};

