const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const {selectAllTasks,
    selectTaskById,
    insertTask,
    findTaskById,
    createNewTaskRecord,
    updateTaskValues} = require('./tasksHelpers.js');

const db = new sqlite3.Database('./db/Matreshka.db');

tasksRouter = express.Router();
module.exports = tasksRouter;

// Get all tasks
tasksRouter.get('/', (req, res, next) =>     
    db.all(selectAllTasks(), (error, rows) => 
        error ? res.status(400).send(error)
              : res.status(200).send(rows))
)

// Get tasks by ID
tasksRouter.get('/:id', (req, res, next) =>     
    db.all(selectTaskById(req.params.id), (error, rows) => 
        error ? res.status(400).send(error)  
              : res.status(200).send(rows))
)

// Create tasks
tasksRouter.post('/', (req, res, next) => {
    const newTask = createNewTaskRecord(req.body);
    db.run(insertTask(newTask), error => 
        error ? res.status(400).send(`Error happened: ${error}`)
              : res.status(201).json(newTask))
})

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


