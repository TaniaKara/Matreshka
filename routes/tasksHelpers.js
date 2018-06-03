const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/Matreshka.db');

// Select ALL tasks
const selectAllTasks = () => {
    return "SELECT * FROM Tasks";
}

// Select task by Id
const selectTaskById = (id) => {
    return `SELECT * FROM Tasks WHERE id = ${id}`;
}

// Create task record
const insertTask = (newTask) => {
    return `INSERT INTO Tasks(Description, UserId) VALUES ('${newTask.description}', '${newTask.userId}')`;
}

// Update task query
const updateTask = (newValues) => {
    return `UPDATE Tasks 
            SET Description = ${newValues.description}
                ,UserId = ${newValues.userId}
                ,CreatedOn = ${newValues.createdOn}
            WHERE Id = ${newValues.id}`;
}

// Find a task record by ID
const findTaskById = (id) => {
    // db.get() executes the query and calls the callback function on the first resul row            
    db.get(selectTaskById(id), (error, row) => { 
        if(error){
            console.log(error);
            return -1;
        }
        if(!row){ // if the query returns empty row = undefined
            console.log(`Task ${id} does not exist!`);
            return -1;
        } // if query returns a row, return the row         
        return row;
    });    
}

const createNewTaskPayload = (payload) => {
    const newValues = {};
    if(payload.hasOwnProperty('description')){
        newValues.description = payload.description;
    }
    if(payload.hasOwnProperty('userId')){
        newValues.userId = payload.userId;
    }
    if(payload.hasOwnProperty('createdOn')){
        newValues.createdOn = payload.createdOn;
    }
    return newValues;
}

// Update a task record
const updateTaskValues = (task, newValues) => { 
    const updatedTask = Object.assign(task, newValues);
    db.run(updateTask(updatedTask), (error) => {
        if(error){
            console.log(error);
            return false;
        }
        console.log(`Rows updated: ${this.changes}`);
        return this.changes;
    });
}

module.exports = {
    selectAllTasks,
    selectTaskById,
    insertTask,
    findTaskById,
    createNewTaskPayload,
    updateTaskValues
};
