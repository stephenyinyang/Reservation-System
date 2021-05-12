var express = require('express');
var router = express.Router();
const appController = require('../controllers/app.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/setDisabled', authorize(Role.admin), appController.setDisabled);
router.get('/getDisabled', appController.getDisabled);


module.exports = router;
