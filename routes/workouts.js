const {allRuns,singleRun,create,deleteRun,filterRun, filterDistance} = require('../controllers/workouts'); 
const {jwt,routeInfo} = require('../middleware/middleware'); 
const router = require('express').Router();

router.get('/all/:id',routeInfo,allRuns);
router.get('/single/:userid/:runid',routeInfo,singleRun);
router.post('/',routeInfo,create);
router.delete('/:id',routeInfo,deleteRun);
router.get('/filter',routeInfo,filterRun);  
router.get('/filter/distance',routeInfo,filterDistance);  

module.exports = router;
