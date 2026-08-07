const express = require("express");
const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let db;

async function initializeDbAndServer() {
  try {
    db = await open({
      filename: path.join(__dirname, "database.db"),
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `);

    app.listen(5000, () => {
      console.log("Server started on http://localhost:5000");
    });
  } catch (error) {
    console.error(`A database failed: ${error.message}`);
    process.exit(1);
  }
}
