const express = require('express'); 
const mysql = require('mysql2');
const db = require('./database');
const userRoutes = require('./routes/users');
const workoutRoutes = require('./routes/workouts'); 

const app = express()
app.use(express.json()); 
app.use('/user',userRoutes);
app.use('/workout',workoutRoutes);


// const db = mysql.createConnection(
//     {
//         host: 'localhost',     // Replace with your database host
//         user: 'root',          // Replace with your database username
//         password: 'Savator123.',  // Replace with your database password
//         database: 'fitness'// Replace with your database name
//     }
// ) 

db.connect(err=>{
    if(err){
        console.log('Connection error',err)
    }  
    app.listen(3001,()=>{
        console.log('Connected to database and running on port 3001')
    })
}
)