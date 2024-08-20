const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/login', authController.loginPage);
router.post('/register', authController.registerUser);

module.exports = router;
