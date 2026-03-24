const Database = require("better-sqlite3");
const db = new Database("security.db", { verbose: console.log });

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

module.exports = { createUser, findUserByUsername };
