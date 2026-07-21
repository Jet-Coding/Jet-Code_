// backend/data.js

const languages = [
  { name: "JavaScript", level: "Advanced", icon: "js-icon", category: "Frontend/Backend" },
  { name: "Node.js", level: "Intermediate", icon: "node-icon", category: "Backend" },
  { name: "SQL / MySQL", level: "Advanced", icon: "db-icon", category: "Database" },
  { name: "HTML5/CSS3", level: "Expert", icon: "html-icon", category: "Frontend" }
];

const projects = [
  {
    title: "Role-Based Information Management System",
    description: "A secure web application featuring Role-Based Access Control (RBAC), JWT authentication, and automated organizational reporting.",
    tags: ["Node.js", "Express", "MySQL", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project"
  }
];

const tutorials = [
  {
    title: "Building Secure Auth Flows with JWT and Node.js",
    excerpt: "Learn how to implement bulletproof JSON Web Token authentication, safely handle cookies, and protect server routes.",
    readTime: "8 min read",
    category: "Backend Security"
  }
];

module.exports = { languages, projects, tutorials };