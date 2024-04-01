

const mysql = require("mysql")
const util = require("util")
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"react_node_db",
    port:"3306" // 3306 || 
});
db.query = util.promisify(db.query).bind(db);                           

module.exports = db;