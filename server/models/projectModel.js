const db = require("../config/db"); // Your MySQL connection pool

exports.findAll = async () => {
	// Execute a secure SQL query to get table data
	const [rows] = await db.execute("SELECT * FROM projects ORDER BY year DESC");
	return rows; // Returns rows back up to the controller
};

exports.create = async (projectData) => {
	const { year, system, title, desc } = projectData;

	const query = `INSERT INTO projects (year, system, title, desc) VALUES (?, ?, ?, ?)`;
	const [result] = await db.execute(query, [year, system, title, desc]);

	return result.insertId; // Returns the newly generated primary key back to the controller
};
