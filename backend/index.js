import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { pool, createTables } from "./db.js";
import { initDatabase } from "./initDb.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  await initDatabase();
  await createTables();
})();

app.get("/", (req, res) => {
  res.send("🔥 Dayflow Backend Live");
});

app.get("/employees", async (req, res) => {
  const users = await pool.query(
    "SELECT employee_id, name, email, role, salary FROM users"
  );
  res.json(users.rows);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!user.rows.length)
    return res.status(401).json({ message: "User not found" });

  const ok = await bcrypt.compare(password, user.rows[0].password);
  if (!ok)
    return res.status(401).json({ message: "Wrong password" });

  res.json({
    id: user.rows[0].id,
    name: user.rows[0].name,
    role: user.rows[0].role,
    salary: user.rows[0].salary
  });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${process.env.PORT}`);
});
