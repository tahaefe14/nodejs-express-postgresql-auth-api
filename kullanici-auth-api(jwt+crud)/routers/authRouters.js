import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { register } from "module";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;