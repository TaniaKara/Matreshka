const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/Matreshka.db');

// Select ALL users
const getAllUsers = () => {
    return "SELECT * FROM Users";
}

// Select users by Id
const getUsersById = (id) => {
    return `SELECT * FROM Users WHERE id = ${id}`;
}

// Create task record
const createUsers = (newUser) => {
    return `INSERT INTO Users(email, username) VALUES ('${newUser.email}', '${newUser.username}')`;
}

module.exports = {
    getAllUsers,
    getUsersById,
    createUsers
};
