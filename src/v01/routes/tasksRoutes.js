const express = require("express");
const tasksController = require("../../controllers/tasksController");

const router = express.Router();

router
.get("/:taskId", tasksController.getTask)
.post("/", tasksController.createTask)
.patch("/:taskId", tasksController.updateTask)
.delete("/:taskId", tasksController.deleteTask)

module.exports = router;