const sqlite3 = require('sqlite3').verbose;
const db = new sqlite3.Database('./db/Matreshka.db', (error) => {
    if(error){
        console.error(error.message);
    }
    console.log('Connected to Matreshka database');
});








module.exports = {

}
