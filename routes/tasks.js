const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const {selectAllTasks,
    selectTaskById,
    insertTask,
    findTaskById,
    createNewTaskPayload,
    updateTaskValues} = require('./tasksHelpers.js');

const db = new sqlite3.Database('./db/Matreshka.db');

tasksRouter = express.Router();
module.exports = tasksRouter;

// Get all tasks
tasksRouter.get('/', (req, res, next) => {    
    db.all(selectAllTasks(), (error, rows) => {
        if(error){
            res.status(404).send(error);
        }else{
            res.status(200).json(rows);
        }
    }) 
});

// Get tasks by ID
tasksRouter.get('/:id', (req, res, next) => {
    const taskId = req.params.id;    
    db.all(selectTaskById(taskId), (error, rows) => {
        if(error){            
            res.status(404).send(error);
        }else{
            res.status(200).json(rows);
        }
    })
});

// Create tasks
tasksRouter.post('/', (req, res, next) => {
    const newTask = createNewTaskPayload(req.body);
    console.log(newTask);
    db.run(insertTask(newTask), error => {
        if(error){            
            res.status(400).send(`Error happened ${error}`);
        }else{
            res.status(201).json(this.changes);
        }
    })
    //res.send(newTask);
});

// Update tasks
tasksRouter.put('/:id', (req, res, next) => {
    let task = findTaskById(req.params.id); // find if the task with that ID exists;
    const newTask = createNewTaskPayload(req.body);    
    console.log(task);    
    /*if(task !== -1){ // if task is found
        if(newTask){
            const updatedTask = updateTaskValues(task, newTask);// update task in the db
            if(updatedTask !== -1){
                res.status(200).send(updatedTask);
            }else{
                res.status(400).send('Task not updated');
            }
        }else{
            res.status(400).send('Empty payload');
        }        
    }else { //if task is not found
        res.status(404).send(`Task with ${req.params.id} does not exist!`);
    }*/
});