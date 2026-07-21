const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

const db = pool.promise();

async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
}

async function getUser(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
}

async function createUser(
    alias, email, password_hash
) {
    const result = await pool.query(
        "INSERT INTO users (alias, email, password_hash) VALUES (?, ?, ?)",
        [alias, email, password_hash],
    );
    const id = result.insertId;
    return getUser(id);
}

// Export the promise-based pool for clean async/await syntax
module.exports = {db, getUsers, getUser, createUse};
