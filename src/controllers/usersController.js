const usersService = require("../services/usersService");

const getUsers = (req, res) => {
    try {
      const allUsers = usersService.getUsers();
      res.send({ status: "OK", data: allUsers });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

const createUser = (req, res) => {
    const { body } = req;

    if (
        !body.username ||
        !body.fullName
    ) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "Falta algun dels següents camps: 'username', 'fullName'",
            },
        });
    }

    const newUser = {
        username: body.username,
        fullName: body.fullName
    };

    try {
        const createdUser = usersService.createUser(newUser);
        res.status(201).send({ status: "OK", data: createdUser });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
};

const getUserTasks = (req, res) => {
    const {
      params: { userId },
    } = req;
  
    if (!userId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':userId' can not be empty" },
      });
      return;
    }
  
    const { status, createdAt } = req.query;
  
    try {
      const tasks = usersService.getUserTasks(userId, { status, createdAt });
      res.send({ status: "OK", data: tasks });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const deleteUser = (req, res) => {
    const {
      params: { userId },
    } = req;
  
    if (!userId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':userId' can not be empty" },
      });
    }
  
    try {
      usersService.deleteUser(userId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

module.exports = {
    createUser,
    getUsers,
    getUserTasks,
    deleteUser
  };