import { error } from "console";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const connectDB = async (req, res) => {
    try {
        await pool.query("SELECT NOW()");
        console.log("PostgreSQL connected");
    } catch (err) {
        console.log("DB connection error", error.message);
        process.exit(1);
    }
};
export default pool;