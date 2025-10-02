import express from "express";
import { getAllUsers, getSingleUser, updateSingleUser, deleteSingleUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/:id", protect, getSingleUser);
router.put("/:id", protect, updateSingleUser);
router.delete("/:id", protect, deleteSingleUser);

export default router;