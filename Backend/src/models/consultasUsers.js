import { pool } from "../config/db.js";

const getUser = async (email) => {
  try {
    const consulta = 'SELECT * FROM users WHERE email = $1;';
    const { rows } = await pool.query(consulta, [email]);
    return rows[0] || null; 
  } catch (error) {
    console.error("Error al consultar el usuario (getUser) ", error);
    throw error; 
  }
};

const checkEmailEnabled = async (email) => {
  try {
    const consulta = 'SELECT email FROM users WHERE email = $1';
    const { rowCount } = await pool.query(consulta, [email]);
    return rowCount > 0;
  } catch (error) {
    console.error("Error al consultar checkEmailEnabled ", error);
    throw error;
  }
};

const newUser_Profile = async (name, last_name, email, password, role_id, phone, country, address, image) => {
  const client = await pool.connect(); 
  try {
    await client.query('BEGIN');    
  
    const consulta = 'INSERT INTO users (name, last_name, email, password, role_id) values ($1, $2, $3, $4, $5) RETURNING *;';
    const values = [name, last_name, email, password, role_id];
    const { rows } = await client.query(consulta, values);  
    console.log("Nuevo usuario creado ", values);

 const consultaProfile = 'INSERT INTO profile_users (profileusers_id, phone, country, address, image) values ($1, $2, $3, $4, $5) RETURNING *;';
    const valuesProfile = [rows[0].id_users, phone, country, address, image];  
    
    const { rows: rowsProfile } = await client.query(consultaProfile, valuesProfile);
    console.log("Nuevo perfil de usuario creado ", valuesProfile); 

    await client.query('COMMIT'); 
    return {
      ...rows[0],
      ...rowsProfile[0],
    };

  } catch (error) {
    await client.query('ROLLBACK');
    console.log("Error al consultar (newUser) ", error);
    throw error;  
  } finally {    
    client.release();
  }
};


const getProfileUser = async (id_profile) => {
  try {
    const query = 'SELECT * FROM profile_users WHERE profileusers_id = $1';
    const { rows } = await pool.query(query, [id_profile]);
    return rows[0] || null; 
  } catch (error) {
    console.error("Error al obtener el perfil del usuario (getProfileUser) ", error);
    throw error;
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

