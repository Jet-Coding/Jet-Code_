const ProjectModel = require("../models/projectModel");

exports.getAllProjects = async (req, res) => {
	try {
		// 1. Call the model layer to run the database query
		const projects = await ProjectModel.findAll();

		// 2. Respond to the frontend with an HTTP 200 OK status and the JSON data
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({
			message: "Error retrieving data from database",
			error: error.message,
		});
	}
};

exports.createProject = async (req, res) => {
	const { year, system, title, desc } = req.body; // Extract properties from frontend request

	// Quick validation check
	if (!title || !desc) {
		return res
			.status(400)
			.json({ message: "Title and Description fields are required" });
	}

	try {
		// Send fields to the model to insert into MySQL
		const insertId = await ProjectModel.create({ year, system, title, desc });

		// Return a successful 201 Created status back to your admin dashboard script
		res.status(201).json({ message: "Project created!", id: insertId });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Database insertion error", error: error.message });
	}
};
