import { verifyRegisteredUser, verifyCredentials } from "../middlewares/middlewareUsers.js";
import { userController } from '../controllers/userController.js';
import uploadProfile from "../middlewares/uploadProfile.js";
import express from 'express';

const routerUsers = express.Router();

routerUsers.post("/login", userController.login_user);
routerUsers.post("/register", uploadProfile.single('image'),verifyRegisteredUser, userController.register_user);
routerUsers.get("/profile/:usuario_id", userController.getProfile_User);
//routerUsers.get("/UpdateProfile/:usuario_id", userController.getProfile_User);
routerUsers.post("/UpdateProfile", uploadProfile.single('image'),  userController.updateProfile_User);

routerUsers.all('(.*)', (req, res) => {
    res.status(404).json({ ok: false, message: "404 Pagina no encontrada." });
});

export default routerUsers;
