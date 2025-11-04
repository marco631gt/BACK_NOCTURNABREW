// SERVICES/login.service.js
import { Users } from '../MODELS/user.model.js';

export async function authenticateUser(email, password) {
  // Buscar el usuario por email
  const user = await Users.findOne({ email });
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  // Verificar contraseña (sin hash por ahora)
  if (user.password !== password) {
    const err = new Error("Contraseña incorrecta");
    err.status = 401;
    throw err;
  }

  return user;
}
