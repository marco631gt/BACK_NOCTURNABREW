// CONTROLLERS/login.controller.js
import * as service from '../SERVICES/login.service.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son requeridos" });
    }

    const { user, token } = await service.authenticateUser(email, password);
    
    res.status(200).json({
      message: "Login exitoso",
      token,
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
