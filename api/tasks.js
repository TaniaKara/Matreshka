const express = require('express');
const sqlite3 = require('sqlite3');
const {getAllTasks, getTasksById, postTasks} = require('./sqlTasks.js');

const db = new sqlite3.Database('./db/Matreshka.db');

tasksRouter = express.Router();
module.exports = tasksRouter;

// Get all tasks
tasksRouter.get('/', (req, res, next) => {
    const getAllTasksQuery = getAllTasks();
    db.all(getAllTasksQuery, (error, rows) => {
        if(error){
            console.error(error);
            res.send();
        }
        if(rows){
            res.json(rows);        
        }else{
            res.send('Tasks empty');
        }
    }) 
});

// Get tasks by ID
tasksRouter.get('/:id', (req, res, next) => {
    const taskId = req.params.id;
    const getTasksByIdQuery = getTasksById(taskId);
    db.all(getTasksByIdQuery, (error, rows) => {
        if(error){
            console.log(error);
            res.send();
        }
        if(rows){
            res.json(rows);
        }
    })
});

// Create tasks
tasksRouter.post('/tasks', (req, res, next) => {
    const newTask = {};
    newTask.description = req.params.Description;
    newTask.userId = req.params.userId;
    db.run(postTasks(newTask), error => {
        console.log(error);
    })

});