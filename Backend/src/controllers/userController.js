import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { consultasUsers } from "../models/consultasUsers.js";
import { handleError } from "../handleError/handleError.js";

const login_user = async (req, res) => {
  console.log("BODY RECIBIDO:", req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw {
        code: 400,
        message: "El correo electronico y la contraseña son requeridos.",
      };
    }

    const user = await consultasUsers.getUser(email);
    if (!user) {
      throw {
        code: 400,
        message: `El correo electronico ${email} no esta registrado.`,
      };
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      throw { code: 400, message: "La contraseña es incorrecta." };
    }

    const token = Jwt.sign({ 
    id: user.id_users,
    email: user.email,
    role_id: user.role_id }, process.env.JWT_PASSWORD);

    res.status(200).json({
      token: token,
      ok: true,
      message: "Inicio de sesion exitoso.",
      usuario: user,
    });
  } catch (error) {
    console.error("Error en login_user:", error);
    const { status = 500, message = "Error interno del servidor" } =
      handleError(error.code, error.message);
    return res.status(status).json({ ok: false, message });
  }
};

const register_user = async (req, res) => {
  console.log("BODY RECIBIDO:", req.body);
  try {
    const {
      name,
      last_name,
      email,
      password,
      role_id,
      phone,
      country,
      address,
    } = req.body;
    const passwordEncrypted = await bcrypt.hash(password, 10);

    const checkEmail = await consultasUsers.checkEmailEnabled(email);
    console.log('Email ya registrado?', checkEmail);
    if (checkEmail) {
      throw { code: 400, message: `El correo electronico ${email} ya ha sido registrado anteriormente.` };
    }
    const image_url = req.file ? `/uploads/profile/${req.file.filename}` : null;
    console.log('URL de imagen:', image_url);
    const resultUser = await consultasUsers.newUser_Profile(name, last_name, email, passwordEncrypted, role_id, phone, country, address, image_url);    
    console.log('Usuario registrado:', resultUser);
    if (!resultUser || !resultUser.profileusers_id ) {
      throw { code: 400, message: 'El registro del usuario ha fallado.' };
    }
    res.status(201).json({ ok: true, user: resultUser,  message: 'El registro del usuario fue exitoso.' });
  } catch (error) {
     console.error("ERROR REGISTER USER:", error);  
    const { status = 500, message = 'Error interno del servidor' } = handleError(error.code, error.message);
    return res.status(status).json({ ok: false, message:  error.message });
  }
};

const getProfile_User = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    if (!usuario_id) {
      throw { code: 400, message: "El Id del usuario es requerido." };
    }
    const profile = await consultasUsers.getProfileUser(usuario_id);
    if (!profile) {
      throw { code: 400, message: "El usuario no está registrado." };
    }
    res.status(200).json({ ok: true, message: "Perfil encontrado.", perfil: profile });
  } catch (error) {
    console.error('Error en getProfile_User'.error); 
    const { status = 500, message = 'Error interno del servidor' } = handleError(error.code, error.message);
    res.status(status).json({ ok: false, message:  error.message });
  }
};

const updateProfile_User = async (req, res) => {
  try {
    const { profileusers_id, phone, country, address, image, password } = req.body;
    let passwordEncrypted;

    if (password) {
      passwordEncrypted = await bcrypt.hash(password, 10);
    }
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/profile/${req.file.filename}`;
    }
     const result = await consultasUsers.updateProfileUser (profileusers_id, phone, country, address, image_url, passwordEncrypted);
    if (!result) {
      throw { code: 400, message: 'Actualización del usuario fallida.' };
    }

    res.status(200).json({ ok: true,  user: result, message: 'Actualización del usuario exitoso.' });
  } catch (error) {
    const { status = 500, message = 'Error interno del servidor' } = handleError(error.code, error.message);
    res.status(status).json({ ok: false, message:  error.message });
  }
};

export const userController = {
  login_user,
  register_user,
  getProfile_User,
  updateProfile_User,
};
