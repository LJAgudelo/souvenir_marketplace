import { Router } from "express";
import {
  verifyRegisteredUser,
  verifyCredentials,
} from "../middlewares/middlewareUsers.js";
import { userController } from "../controllers/userController.js";

const routerUsers = Router();

// RUTAS PUBLICAS
routerUsers.post("/login", userController.login_user);
routerUsers.post(
  "/register",
  verifyRegisteredUser,
  userController.register_user
);

// RUTAS PRIVADAS
routerUsers.get("/profile/:usuario_id", userController.getProfile_User);
routerUsers.put(
  "/profile",
  verifyCredentials,
  verifyRegisteredUser,
  userController.updateProfile_User
);

routerUsers.all("(.*)", (req, res) => {
  res.status(404).json({ ok: false, message: "404 Pagina no encontrada." });
});

export default routerUsers;
