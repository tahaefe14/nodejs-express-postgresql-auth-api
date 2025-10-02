// models/userModel.js
import pool from "../config/db.js";

// Kullanıcı oluştur (register)
export const createUser = async (username, email, password) => {
  const res = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, password]
  );
  return res.rows[0];
};

// Email ile kullanıcı bul (login)
export const findUserByEmail = async (email) => {
  const res = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  return res.rows[0];
};

// Tüm kullanıcılar
export const getUsers = async () => {
  const res = await pool.query("SELECT id, username, email FROM users");
  return res.rows;
};

// Tek kullanıcı
export const getUserById = async (id) => {
  const res = await pool.query(
    "SELECT id, username, email FROM users WHERE id=$1",
    [id]
  );
  return res.rows[0];
};

// Kullanıcı güncelle
export const updateUser = async (id, username, email) => {
  const res = await pool.query(
    "UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING id, username, email",
    [username, email, id]
  );
  return res.rows[0];
};

// Kullanıcı sil
export const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  return { message: "User deleted" };
};
