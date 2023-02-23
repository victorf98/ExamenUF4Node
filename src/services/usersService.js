const { v4: uuid } = require("uuid");
const Users = require("../database/Users");

const getUsers = () => {
  try {
    const allUsers = Users.getUsers();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

const createUser = (newUser) => {
    const userToInsert = {
      ...newUser,
      id: uuid(),
      createdAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
    };
    try {
      const createdUser = Users.createUser(userToInsert);
      return createdUser;
    } catch (error) {
      throw error;
    }
  };

  const getUserTasks = (userId, filterParams) => {
    try {
      const tasks = Users.getUserTasks(userId, filterParams);
      return tasks;
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = (userId) => {
    try {
      Users.deleteUser(userId);
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    createUser,
    getUsers,
    getUserTasks,
    deleteUser
  };