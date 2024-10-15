const routeInfo = (req,res,next) => {
    console.log(`path : ${req.path} --- method : ${req.method}`) 
    next()
} 

const jwt = (req,res) => {

} 

module.exports = {routeInfo,jwt};