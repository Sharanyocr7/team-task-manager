const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    const tasks = await Task.find();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "Completed").length;
    const pendingTasks = tasks.filter(t => t.status === "Pending").length;
    const inProgressTasks = tasks.filter(t => t.status === "In Progress").length;

    const now = new Date();
    const overdueTasks = tasks.filter(
      t => t.deadline && new Date(t.deadline) < now && t.status !== "Completed"
    ).length;

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard failed", error: err.message });
  }
};