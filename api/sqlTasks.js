const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/Matreshka.db');

// Select ALL tasks
const getAllTasks = () => {
    return "SELECT * FROM Tasks";
}

// Select task by Id
const getTasksById = (id) => {
    return `SELECT * FROM Tasks WHERE id = ${id}`;
}

// Create task record
const postTasks = (newTask) => {
    `INSERT INTO Tasks VALUES (${newTask.description}, ${newTask.userId})`;
}

module.exports = {
    getAllTasks,
    getTasksById,
    postTasks
};
