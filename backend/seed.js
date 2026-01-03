import { pool } from "./db.js";

const seed = async () => {
  await pool.query(`
    INSERT INTO users (name, email, password, phone, salary)
    VALUES
    ('Rahul Sharma', 'rahul.sharma@dayflow.in', 'password123', '9876543210', 45000),
    ('Priya Verma', 'priya.verma@dayflow.in', 'password123', '9123456780', 52000),
    ('Amit Patel', 'amit.patel@dayflow.in', 'password123', '9988776655', 60000),
    ('Sneha Iyer', 'sneha.iyer@dayflow.in', 'password123', '9090909090', 58000);
  `);

  console.log("✅ Database seeded with Indian fake data");
  process.exit();
};

seed();
