const db = require('../database');
const bcrypt = require('bcrypt');

const allUsers = (req,res) => {
    try{
        db.query('SELECT * FROM users',(error,results)=>{
            if(error){
                console.log('Error',error)
            }
            res.status(200).json(results)
        })
    }catch(error){

    }
}

const singleUser = (req,res) => { 
    const {id} = req.params;
    try{
        db.query(`SELECT * FROM Users WHERE Userid = ${id}`,(error,results)=>{
            if(error){
                console.log('Error',error)
            }else if(results.length===0){
                return res.status(404).json({err : 'User does not exist'})
            }
            res.status(200).json(results);
        })
    }catch(error){
        
    }
}

const createUser = async(req,res) => {
    const {Firstname,Lastname,Email,Username,Password} = req.body;    
    try{ 
        const hash = await bcrypt.hash(Password,10); 
        if(!hash){
            return res.status(500).json({error:'Failed to encrypt password'})
        }
        db.query(`INSERT INTO Users (Firstname,Lastname,Email,Username,Password) VALUES (?,?,?,?,?)`,[Firstname,Lastname,Email,Username,hash], (error,results)=>{
            if(error){
                console.log('Error',error)
            }
            res.status(200).json(results);
        })
    }catch(error){
        
    }
}

const login = async(req,res) => {
    const {Username,Password} = req.body;
    try{        
        const user = db.query(`SELECT * FROM Users WHERE Username = ? `,Username,async (error,results)=>{
            if(error){
                console.log('Error',error)
            }else if(results.length===0){
                return res.status(404).json({err : 'Incorrect username'})
            }
            
            const valid = await bcrypt.compare(Password,results[0].Password);
            console.log(valid)
            if(!valid){
                return res.status(404).json({err : 'Incorrect password'});
            } 
            res.status(200).json(results);
        })
        
    }catch(error){
        
    }
}

const deleteUser = (req,res) => {
    const {id} = req.params;
    try{
        db.query(`DELETE FROM Users WHERE Userid = ${id}`,(error,results)=>{
            if(error){
                console.log('error',error)
            }else if(results.affectedRows===0){
                return res.status(404).json({err : 'Failed to delete user'})
            } 
            res.status(200).json(results);
        })
    }catch(error){
        
    }
}

const updateUser = (req,res) => {
    try{

    }catch(error){
        
    }
}

module.exports = {allUsers,singleUser,deleteUser,updateUser,login,createUser};