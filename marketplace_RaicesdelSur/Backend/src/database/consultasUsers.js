import { pool } from "./conexion.js";

const getUser = async (email) => {
  const consulta = 'SELECT * FROM users WHERE email = $1;';
  const { rows: [user] } = await pool.query(consulta, [email]);
  return user;
};

const checkEmailEnabled = async (email) => {
  const consulta = 'SELECT email FROM users WHERE email = $1';
  const { rowCount } = await pool.query(consulta, [email]);
  return rowCount;
};

const newUser = async (nombre,  last_name,  email,  password,  rol_id = 0) => {
  const consulta = 'INSERT INTO users values (DEFAULT, $1, $2, $3, $4, $5) RETURNING *;';
  const values = [nombre, last_name, email, password, rol_id];
  const { rows: [user] } = await pool.query(consulta, values);
  console.log(values);
  return user;
};

const removeUser = async (id_user) => {
  const query = 'DELETE FROM users WHERE id_users= $1';
  const { rowCount } = await pool.query(query, [id_user]);
  return rowCount;
};

const newProfileUser = async (id_profile, phone, country, address, image) => {  
  const values = [ id_profile, phone, country, address, image];
  const consulta = 'INSERT INTO profile_users values (DEFAULT, $1, $2, $3, $4, $5) RETURNING *;';
  const { rowCount } = await pool.query(consulta, values);
  console.log(values);
  return rowCount;
};

const removeProfileUser = async (id_profile) => {
  const query = 'DELETE FROM profile_users WHERE id_profile= $1';
  const { rowCount } = await pool.query(query, [id_profile]);
  return rowCount;
};

const getProfileUser = async (id_profile) => {
  const query = 'SELECT * FROM profile_users WHERE id_profile = $1';
  const { rows: perfil } = await pool.query(query, [id_profile]);
  return perfil;
};

const updateProfileUser = async (profileusers_id, phone, country, address, image ) => {
  const values = [ profileusers_id, phone, country, address, image ];
  const consulta = 'UPDATE profile_users SET phone = $2, country = $3, address = $4, image = $5 WHERE profileusers_id = $1';
  const { rowCount } = await pool.query(consulta, values);
  return rowCount;
};


export const consultasUsers = {
  getUser,
  checkEmailEnabled,
  newUser,
  removeUser,
  getProfileUser,
  newProfileUser,
  updateProfileUser,
  removeProfileUser
};
