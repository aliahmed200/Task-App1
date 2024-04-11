const express = require("express");
const Task = require("../models/taskModel");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskControllers");
const router = express.Router();

//another way  hard
// router.route("/").get(getTasks).post(createTask);
// router.route("/:id").get(getTask).delete(deleteTask).put(updateTask);

// easy to read
//create a task
router.post("/", createTask);
// Get all taskes
router.get("/", getTasks);
// get one task
router.get("/:id", getTask);
// delete task
router.delete("/:id", deleteTask);
// update task
router.put("/:id", updateTask);

module.exports = router;
