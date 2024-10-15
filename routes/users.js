const {createUser,deleteUser,login,allUsers,singleUser,updateUser} = require('../controllers/users');
const {routeInfo,jwt} = require('../middleware/middleware');
const router = require('express').Router(); 

router.get('/',routeInfo,allUsers);
router.get('/:id',routeInfo,singleUser);
router.post('/register',routeInfo,createUser);
router.post('/login',routeInfo,login);
router.delete('/:id',routeInfo,deleteUser);
router.patch('/:id',routeInfo,updateUser); 

module.exports = router;