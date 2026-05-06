const Project = require("../models/project");

// Create Project
exports.createProject = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const project = await Project.create({
      name: req.body.name,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("members", "name email")
      .populate("createdBy", "name");

    res.json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};