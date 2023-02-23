const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getUsers = () => {
    try {
        let users = DB.users;
        return users;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const createUser = (newUser) => {
    try {
        const isAlreadyAdded =
            DB.users.findIndex((user) => user.usrname === newUser.username) > -1;

        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `User with the name '${newUser.username}' already exists`,
            };
        }

        DB.users.push(newUser);
        saveToDatabase(DB);

        return newUser;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getUserTasks = (userId, filterParams) => {
    try {
        let tasks = DB.tasks.filter((task) => task.user === userId);
        if (filterParams.status && filterParams.createdAt) {
            let tasques = returnTasquesPerData(filterParams.createdAt, tasks);
            return tasques.filter((task) =>
                task.status.includes(filterParams.status)
            );
        } else if (filterParams.status) {
            return tasks.filter((task) =>
                task.status.includes(filterParams.status)
            );
        } else if (filterParams.createdAt) {
            let tasques = returnTasquesPerData(filterParams.createdAt, tasks);
            return tasques
        }

        return tasks;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

function returnTasquesPerData(createdAt, tasks) {
    let data = createdAt;
            let dia = parseInt(data.split("/")[0]);
            let mes = parseInt(data.split("/")[1]);
            let any = parseInt(data.split("/")[2]);
            console.log(data)
            let tasques = [];

            tasks.forEach((task) => {
                let data_tasca = task.createdAt.split(",")[0];
                let dia_tasca = parseInt(data_tasca.split("/")[0]);
                let mes_tasca = parseInt(data_tasca.split("/")[1]);
                let any_tasca = parseInt(data_tasca.split("/")[2]);
                console.log(data_tasca)

                if (any_tasca > any) {
                    tasques.push(task);
                } else if (any_tasca == any && mes_tasca > mes) {
                    tasques.push(task);
                } else if (any_tasca == any && mes_tasca == mes && dia_tasca >= dia) {
                    tasques.push(task);
                }
            }
            );
    return tasques;
}

const deleteUser = (userId) => {
    try {
        const indexForDeletion = DB.users.findIndex(
            (user) => user.id === userId
        );
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `No es pot trobar l'usuari amb la id '${userId}'`,
            };
        }
        const userTasks = DB.tasks.filter((task) => task.user === userId);
        if (userTasks[0]) {
            throw {
                status: 400,
                message: `L'usuari amb la id '${userId}' té tasques pendents`,
            };
        } else {
            DB.users.splice(indexForDeletion, 1);
            saveToDatabase(DB);
        }

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserTasks,
    deleteUser
};