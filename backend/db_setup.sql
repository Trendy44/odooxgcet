-- ===============================
-- Dayflow Database Setup (pgAdmin SAFE)
-- ===============================

-- ===============================
-- USERS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- ADD MISSING COLUMNS
-- ===============================
ALTER TABLE users
ADD COLUMN IF NOT EXISTS phone TEXT;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS salary INTEGER;

-- ===============================
-- CLEAR OLD DATA (OPTIONAL)
-- ===============================
DELETE FROM users;

-- ===============================
-- SEED INDIAN FAKE DATA
-- ===============================
INSERT INTO users (name, email, password, phone, salary)
VALUES
('Rahul Sharma', 'rahul.sharma@dayflow.in', 'password123', '9876543210', 45000),
('Priya Verma', 'priya.verma@dayflow.in', 'password123', '9123456780', 52000),
('Amit Patel', 'amit.patel@dayflow.in', 'password123', '9988776655', 60000),
('Sneha Iyer', 'sneha.iyer@dayflow.in', 'password123', '9090909090', 58000);

-- ===============================
-- VERIFY
-- ===============================
SELECT * FROM users;
