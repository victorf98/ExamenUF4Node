const tasksService = require("../services/tasksService");

const getTask = (req, res) => {
    const {
        params: { taskId },
    } = req;

    if (!taskId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter ':taskId' can not be empty" },
        });
        return;
    }

    try {
        const task = tasksService.getTask(taskId);
        res.send({ status: "OK", data: task });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createTask = (req, res) => {
    const { body } = req;

    if (
        !body.user ||
        !body.title ||
        !body.description ||
        !body.status
    ) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "Falta algun dels següents camps: 'user', 'title', 'description', 'status'",
            },
        });
    }

    const newTask = {
        user: body.user,
        title: body.title,
        description: body.description,
        status: body.status
    };

    try {
        const createdTask = tasksService.createTask(newTask);
        res.status(201).send({ status: "OK", data: createdTask });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
};

const updateTask = (req, res) => {
    const {
        body,
        params: { taskId },
    } = req;

    if (!taskId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter ':taskId' can not be empty" },
        });
    }

    try {
        const updatedTask = tasksService.updateTask(taskId, body);
        res.send({ status: "OK", data: updatedTask });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteTask = (req, res) => {
    const {
      params: { taskId },
    } = req;
  
    if (!taskId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':taskId' can not be empty" },
      });
    }
  
    try {
      tasksService.deleteTask(taskId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
};