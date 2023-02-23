const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getTask = (taskId) => {
    try {
        const task = DB.tasks.find((task) => task.id === taskId);

        if (!task) {
            throw {
                status: 400,
                message: `Can't find maquina with the id '${taskId}'`,
            };
        }

        return task;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createTask = (newTask) => {
    try {
        const isAlreadyAdded =
            DB.tasks.findIndex((task) => task.title === newTask.title) > -1;

        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Task with the name '${newTask.title}' already exists`,
            };
        }

        const userExists = DB.users.findIndex((user) => user.id === newTask.user) > -1;

        if (!userExists) {
            throw {
                status: 400,
                message: `User with the id '${newTask.user}' does not exist`,
            };
        }

        DB.tasks.push(newTask);
        saveToDatabase(DB);

        return newTask;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const updateTask = (taskId, changes) => {
    try {
  
      const indexForUpdate = DB.tasks.findIndex(
        (task) => task.id === taskId
      );
  
      if (indexForUpdate === -1) {
        throw {
          status: 400,
          message: `No es pot trobar la tasca amb la id '${taskId}'`,
        };
      }
  
      const updatedTask = {
        ...DB.tasks[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
      };
  
      DB.tasks[indexForUpdate] = updatedTask;
      saveToDatabase(DB);
  
      return updatedTask;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  const deleteTask = (taskId) => {
    try {
      const indexForDeletion = DB.tasks.findIndex(
        (task) => task.id === taskId
      );
      if (indexForDeletion === -1) {
        throw {
          status: 400,
          message: `No es pot trobar la tasca amb la id '${taskId}'`,
        };
      }
      DB.tasks.splice(indexForDeletion, 1);
      saveToDatabase(DB);
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };
  

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
};