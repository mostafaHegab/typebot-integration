const path = require("path");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.join(__dirname, "typebot.db"));

db.serialize(() => {
	db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bot_id TEXT,
      email TEXT,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
