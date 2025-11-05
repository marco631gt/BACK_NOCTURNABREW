import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const payload = { app: "MyApp" };
const secret = process.env.APP_JWT_SECRET;

const token = jwt.sign(payload, secret);
console.log("Nuevo AppToken:\n", token);
