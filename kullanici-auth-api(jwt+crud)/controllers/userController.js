// controllers/userController.js
import { getUsers, getUserById, updateUser, deleteUser } from "../models/userModel.js";

// Tüm kullanıcıları al
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Tek kullanıcı
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Kullanıcı güncelle
export const updateSingleUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const updated = await updateUser(req.params.id, username, email);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Kullanıcı sil
export const deleteSingleUser = async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
