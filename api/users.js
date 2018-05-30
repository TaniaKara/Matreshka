const express = require('express');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3');
const {getAllUsers, getUsersById, createUsers} = require('./sqlUsers.js');
const db = new sqlite3.Database('./db/Matreshka.db');

usersRouter = express.Router();
module.exports = usersRouter;

// Get all users
usersRouter.get('/', (req, res, next) => {
    const getAllUsersQuery = getAllUsers();
    db.all(getAllUsersQuery, (error, rows) => {
        if(error){
            console.error(error);
            res.send();
        }
        if(rows){
            res.json(rows);        
        }else{
            res.send('Users empty');
        }
    }) 
});

// Get users by ID
usersRouter.get('/:id', (req, res, next) => {
    const userId = req.params.id;
    const getUsersByIdQuery = getTasksById(taskId);
    db.all(getUsersByIdQuery, (error, rows) => {
        if(error){
            console.log(error);
            res.send();
        }
        if(rows){
            res.json(rows);
        }
    })
});

// Create users

const createNewUserRecord = (payload) => {
    if(payload.hasOwnProperty('email') && payload.hasOwnProperty('username')){
        return {
                email: payload.email,
                username: payload.username
            };          
    } 
    else{
        return false;
    }
};

usersRouter.post('/', (req, res, next) => {
    const newUser = createNewUserRecord(req.body);
    db.run(createUsers(newUser), error => {
        if(error){
            console.error(error);
            res.status(400).send(error);
        }
        res.status(201).send(this.lastID);        
    });
});