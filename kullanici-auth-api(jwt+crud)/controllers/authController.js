import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { error } from "console";

//register
export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await findUserByEmail(email);

        if (userExists) {
            return res.status(400).json({ message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, email, hashedPassword);

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (err) {
        next(error);
    }
};

//login
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
        });

    } catch (err) {
        next(error);
    }
};