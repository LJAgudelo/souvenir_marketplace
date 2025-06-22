import Jwt from "jsonwebtoken";
import { handleError } from "../handleError/handleError.js";
import { consultasUsers } from "../models/consultasUsers.js";

export const verifyRegisteredUser = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw { code: 400, message: "Faltan campos requeridos." };
    }

    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    if (!isEmailValid) {
      throw { code: 400, message: "El correo electronico no es valido." };
    }

    next();
  } catch (error) {
    const { status, message } = handleError(error.code, error.message);
    res.status(status).json({ ok: false, message });
  }
};

export const verifyCredentials = async (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
      throw { code: 401, message: "Token vacio." };
    }

    const token = authorizationHeader?.split("Bearer ")[1]?.trim();

    if (!token) {
      throw { code: 401, message: "Formato de token no valido." };
    }

    const payload = Jwt.verify(token, process.env.JWT_PASSWORD);

    if (!payload) {
      throw { code: 401, message: "Token invalido." };
    }

    req.body.email = payload.email;
    const { id_user } = await consultasUsers.getUser(payload.email);
    req.body.usuario_id = id_user;

    next();
  } catch (error) {
    const { status, message } = handleError(error.code, error.message);
    res.status(status).json({ ok: false, message });
  }
};

export const configCors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
};
