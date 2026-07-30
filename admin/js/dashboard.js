const form = document.getElementById("addProjectForm");

form.addEventListener("submit", async (e) => {
	e.preventDefault(); // Stop page reload

	// Gather form input data fields
	const newProject = {
		year: "2026",
		system: "ORGANIZATIONAL MANAGEMENT",
		title: "Role-Based Info System (PSALM Web)",
		desc: "A secure framework featuring Role-Based Access Control (RBAC).",
	};

	// Send data payload to the backend server API
	const response = await fetch("http://localhost:5000/api/projects", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newProject), // Turn JS object into text string
	});

	const data = await response.json();
	if (response.ok) {
		alert("Project uploaded successfully!");
	}
});
