// CONTROLLERS/login.controller.js
import * as service from '../SERVICES/login.service.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // validación mínima
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son requeridos" });
    }

    const user = await service.authenticateUser(email, password);
    
    // Si todo está bien, respondemos con datos básicos del usuario
    res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
}
