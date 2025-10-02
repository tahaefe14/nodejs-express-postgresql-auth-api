import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouters from "./routers/authRouters.js";
import userRouters from "./routers/userRouters.js";
import { errorHandler } from "./middleware/errorMiddleweare.js";

dotenv.config();
const app = express();

//Middleware
app.use(express.json());

//Routes
app.use('/api/auth', authRouters);
app.use('api/users', userRouters);

//Error Handler
app.use(errorHandler);

// Hata yakalama middleware
app.use((err, req, res, next) => {
  console.error(err); // Konsola detaylı hata yaz
  res.status(500).json({ message: err.message || "Server error" });
});


//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async (req, res) => {
    console.log(`Server running on port ${PORT}`);
});