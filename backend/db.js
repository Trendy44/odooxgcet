import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

export async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      employee_id VARCHAR(50),
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password TEXT,
      role VARCHAR(20),
      salary INT
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      date DATE,
      status VARCHAR(20)
    );

    CREATE TABLE IF NOT EXISTS leaves (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      type VARCHAR(50),
      start_date DATE,
      end_date DATE,
      status VARCHAR(20)
    );
  `);

  console.log("✅ Tables ready");
}
