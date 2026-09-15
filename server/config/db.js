import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  pasword: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("Connected to the database.");
});

pool.on("error", (error) => {
  console.error(`ERROR in database: ${error}`);
});

export default pool;
