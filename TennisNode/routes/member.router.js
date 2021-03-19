var express = require('express');
var router = express.Router();
const memberController = require('../controllers/member.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/authenticate', memberController.authenticate);
router.post('/register', memberController.register);
router.get('/allmembers', authorize(Role.admin),memberController.getAllMembers);
router.get('/getgoals/:username', memberController.getGoals);
router.post('/setgoals', memberController.setGoals);
router.delete('/delete/:username',authorize(Role.admin), memberController.deleteMember);
// add the needed routing for setting and getting member goal values. Hint: '/getgoals/:username' Hint2: '/setgoals'


module.exports = router;
