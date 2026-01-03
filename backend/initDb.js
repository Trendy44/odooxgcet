import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pkg;

export async function initDatabase() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: "postgres"
  });

  await client.connect();

  const check = await client.query(
    `SELECT 1 FROM pg_database WHERE datname='${process.env.DB_NAME}'`
  );

  if (check.rowCount === 0) {
    await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log("✅ Database created");
  } else {
    console.log("✅ Database already exists");
  }

  await client.end();
}
