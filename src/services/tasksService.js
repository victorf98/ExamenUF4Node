const { v4: uuid } = require("uuid");
const Tasks = require("../database/Tasks");

const getTask = (taskId) => {
  try {
    const task = Tasks.getTask(taskId);
    return task;
  } catch (error) {
    throw error;
  }
};

const createTask = (newTask) => {
    const taskToInsert = {
      ...newTask,
      id: uuid(),
      createdAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
    };
    try {
      const createdTask = Tasks.createTask(taskToInsert);
      return createdTask;
    } catch (error) {
      throw error;
    }
  };

  const updateTask = (taskId, changes) => {
    try {
      const updatedTask = Tasks.updateTask(taskId, changes);
      return updatedTask;
    } catch (error) {
      throw error;
    }
  };

  const deleteTask = (taskId) => {
    try {
      Tasks.deleteTask(taskId);
    } catch (error) {
      throw error;
    }
  };
  

  module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
  };