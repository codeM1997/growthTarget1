const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.route('/signup')
    .post(userController.createUser);
userRouter.route('/login')
    .post(userController.login);

module.exports = userRouter  