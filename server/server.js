const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Middleware configuration
app.use(cors()); // Critical: Permits cross-origin requests from your HTML file
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// 1. Mock Database Source (You can hook your MySQL connection pool directly here)
const portfolioData = {
	languages: [
		{
			name: "JavaScript",
			type: "Frontend/Backend",
			icon: "terminal",
			borderColor: "border-primary/20",
			iconColor: "text-primary",
		},
		{
			name: "Node.js",
			type: "Runtime System",
			icon: "data_object",
			borderColor: "border-secondary/20",
			iconColor: "text-secondary",
		},
		{
			name: "MySQL",
			type: "Relational DB",
			icon: "storage",
			borderColor: "border-tertiary/20",
			iconColor: "text-tertiary",
		},
		{
			name: "React.js",
			type: "UI Architecture",
			icon: "token",
			borderColor: "border-secondary/20",
			iconColor: "text-secondary",
		},
		{
			name: "Tailwind CSS",
			type: "Design Systems",
			icon: "auto_awesome",
			borderColor: "border-primary/20",
			iconColor: "text-primary",
		},
		{
			name: "HTML5/CSS3",
			type: "Core Semantic",
			icon: "code",
			borderColor: "border-tertiary/20",
			iconColor: "text-tertiary",
		},
	],
	projects: [
		{
			year: "2026",
			system: "ORGANIZATIONAL MANAGEMENT",
			title: "Role-Based Info System (PSALM Web)",
			desc: "A secure framework featuring Role-Based Access Control (RBAC), robust JSON Web Token mechanics, and isolated data paths for automated organizational operations.",
			img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
			tags: ["Node.js", "Express", "MySQL", "Tailwind CSS"],
			link: "#",
		},
		{
			year: "2025",
			system: "NEXUS COSYSTEM",
			title: "SaaS Enterprise Analytics Engine",
			desc: "High-performance data management processing network handling real-time analytical evaluation clusters on internal asset flows.",
			img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
			tags: ["React", "TypeScript", "PostgreSQL"],
			link: "#",
		},
	],
	tutorials: [
		{
			category: "BACKEND SECURITY",
			title: "Implementing Complete JWT Flows in Node.js",
			excerpt:
				"How to properly construct bulletproof password hashing sequences using bcrypt, issue access tokens securely via cross-origin cookies, and verify structural routes safely.",
			readTime: "7 MIN READ",
		},
		{
			category: "DATABASE REASONING",
			title: "Optimizing High-Performance Connection Pools in MySQL",
			excerpt:
				"Ditching structural bottlenecks. Learn how connection factories utilize safe pooling allocation algorithms to maximize query execution speeds.",
			readTime: "5 MIN READ",
		},
		{
			category: "ARCHITECTURE",
			title: "Building Clean Role-Based Access Controls (RBAC)",
			excerpt:
				"A systematic design guide explaining how database relational architecture controls discrete authorization maps seamlessly inside modern middleware stacks.",
			readTime: "9 MIN READ",
		},
	],
};

// 2. REST Endpoints
app.get("/api/languages", (req, res) => res.json(portfolioData.languages));
app.get("/api/projects", (req, res) => res.json(portfolioData.projects));
app.get("/api/tutorials", (req, res) => res.json(portfolioData.tutorials));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`>> SYSTEM: JetCode Daemon running on port ${PORT}`);
	console.log(`>> UI: Open http://localhost:${PORT} to connect.`);
});
