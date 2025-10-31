import Database from "better-sqlite3";

const db = new Database("memory.db");

db.exec(`CREATE TABLE IF NOT EXISTS mem(
  id TEXT PRIMARY KEY,
  subject TEXT, text TEXT, tags TEXT,
  created_at INTEGER, weight REAL
)`);

export default db;