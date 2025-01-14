const express = require("express");
const {
  getTask,
  updateTask,
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(updateTask).get(getTask).delete(deleteTask);

module.exports = router;
