const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// Traffic controller directs GET requests to 'getAllProjects'
router.get("/projects", projectController.getAllProjects);

// Traffic controller directs incoming data submissions to 'createProject'
router.post("/projects", projectController.createProject);

module.exports = router;
