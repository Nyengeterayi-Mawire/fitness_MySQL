const db = require('../database'); 

//All runs request 
const allRuns = (req,res) => {
    const {id} = req.params;
    try{
        db.query(`SELECT * FROM  Runs WHERE Userid=${id} `,(error,results)=>{
            if(error){
                console.log('Error',error)
            }
            res.status(200).json(results);
        })
    }catch(error){
        res.json({error})
    }
}

//single workout belonging to specific user
const singleRun = (req,res) => {
    const {userid,runid,userId} = req.params;
    try{
        db.query(`SELECT * FROM Runs WHERE Runid = ${runid} AND Userid = ${userId}`,(error,results)=>{
            if(error){
                console.log('Error',error)
            }else if(results.length===0){
                return res.status(404).json({err:'run does not exist'})
            }
            res.status(200).json(results);
        })
    }catch(error){
        res.json({error})
    }
} 

//filter runs by date 
const filterRun = (req,res) => {
    console.log(req.query);
    try{
        if(req.query.startDate && req.query.endDate){
            db.query(`SELECT * FROM Runs WHERE Date>${req.query.startDate} AND Date<${req.query.endDate} AND Userid=${req.query.userId}`,(error,results)=>{
                if(error){
                    console.log('Error',error)
                } 
                res.status(200).json(results)
            })
        }
    }catch(error){
        res.json({error:error.message})
    }
} 

//filter runs by distance
const filterDistance = (req,res) => {
    try{
        if(req.query.startDistance && req.query.endDistance){
            db.query(`SELECT * FROM Runs WHERE Distance > ${req.query.startDistance} AND Distance < ${req.query.endDistance} AND Userid=${req.query.userId}`,(error,results)=>{
                if(error){
                    console.log('Error',error)
                } 
                return res.status(200).json(results)
            })
        }else if (req.query.startDistance && !req.query.endDistance) {
            db.query(`SELECT * FROM Runs WHERE Distance > ${req.query.startDistance} AND Userid=${req.query.userId}`,(error,results)=>{
                if(error){
                    console.log('Error',error)
                } 
                return res.status(200).json(results)
            })
        }else if (!req.query.startDistance && req.query.endDistance){
            db.query(`SELECT * FROM Runs WHERE Distance < ${req.query.endDistance} AND Userid=${req.query.userId}`,(error,results)=>{
                if(error){
                    console.log('Error',error)
                } 
                return res.status(200).json(results)
            })
        }
    }catch(error){
        res.json({error:error.message}) 
    }
}

//create a new run object
const create = (req,res) => { 
    const {Userid,Duration,Distance,Date} = req.body; 
    try{
        db.query('INSERT INTO Runs (Userid,Duration,Distance,Date) Values (?,?,?,?)',[Userid,Duration,Distance,Date],(error,results)=>{
            if(error){
                console.log('Error',error)
            }else if(results.affectedRows==0){
                return res.status(404).json({err:'Failed to create run'})
            } 
            res.status(200).json(results)
        })
    }catch(error){
        res.json({error})
    }
}

//delete a run object
const deleteRun = (req,res) => {
    const {id} = req.params;
    try{
        db.query(`DELETE FROM Runs WHERE Workoutid = ${id}`,(error,results)=>{
            if(error){
                console.log('Error',error)
            }else if(results.affectedRows==0){
                return res.status(404).json({err:'Failed to delete run'})
            } 
            res.status(200).json(results);
        })
    }catch(error){
        res.json({error})
    }
} 

module.exports = {allRuns,singleRun,create,deleteRun,filterRun,filterDistance};