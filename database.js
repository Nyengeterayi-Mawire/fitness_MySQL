const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',     // Replace with your database host
        user: 'root',          // Replace with your database username
        password: 'Savator123.',  // Replace with your database password
        database: 'fitness'// Replace with your database name
    }
)  

module.exports = db;