import { Users } from "../MODELS/user.model.js";
import bcrypt from "bcryptjs";
import { jwtService } from "./jwt.service.js";

export async function authenticateUser(email, password) {
  const user = await Users.findOne({ email });
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Contraseña incorrecta");
    err.status = 401;
    throw err;
  }

  const userData = user.toObject();
  delete userData.password;

  const token = jwtService.generateUserToken({
    id: user._id,
    email: user.email
  });

  return {
    user: userData,
    token,
  };
}
