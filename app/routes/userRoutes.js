const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);

module.exports = router;
