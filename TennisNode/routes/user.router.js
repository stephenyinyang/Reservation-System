var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/allusers', authorize(Role.admin),userController.getAllUsers);
router.get('/getgoals/:username', userController.getGoals);
router.post('/setgoals', userController.setGoals);
router.delete('/delete/:username',authorize(Role.admin), userController.deleteUser);
// add the needed routing for setting and getting user goal values. Hint: '/getgoals/:username' Hint2: '/setgoals'


module.exports = router;
