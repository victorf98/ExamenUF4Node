const express = require("express");
const v01UsersRouter = require("./v01/routes/usersRoutes");
const v01TasksRouter = require("./v01/routes/tasksRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v0.1/users", v01UsersRouter);
app.use("/api/v0.1/tasks", v01TasksRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
