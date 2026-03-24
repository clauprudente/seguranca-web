const path = require("path");
const Database = require("better-sqlite3");
const argon2 = require("argon2");

const db = new Database(path.join(__dirname, "../security.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT NOT NULL,
    passwordHash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    creationDate TEXT NOT NULL
  )
`);

const createUser = (login, passwordHash, role = "user") => {
  const stmt = db.prepare(
    "INSERT INTO users (login, passwordHash, role, creationDate) VALUES (@login, @passwordHash, @role, @creationDate)",
  );
  stmt.run({
    login,
    passwordHash,
    role,
    creationDate: new Date().toISOString(),
  });
};

const findUserByUsername = (login) => {
  const stmt = db.prepare("SELECT * FROM users WHERE login = ?");
  return stmt.get(login);
};

const seedAdmin = async () => {
  const exists = findUserByUsername("admin");
  if (!exists) {
    const hash = await argon2.hash("admin123");
    createUser("admin", hash, "admin");
    console.log("Admin criado — login: admin, password: admin123");
  }
};

seedAdmin();

module.exports = { createUser, findUserByUsername };
