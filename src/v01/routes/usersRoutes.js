const express = require("express");
const usersController = require("../../controllers/usersController");

const router = express.Router();

router
.get("/", usersController.getUsers)
.get("/:userId/tasks", usersController.getUserTasks)
.post("/", usersController.createUser)
.delete("/:userId", usersController.deleteUser)

module.exports = router;