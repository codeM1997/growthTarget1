const User = require('../models/user');
var jwt = require('jsonwebtoken');
exports.createUser = async (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, data) => {
        if (err) {
            res.json({
                message: 'Error Creating User',
                error: err
            })
        } else {
            res.json({
                message: 'New User Created',
                data: data
            })
        }

    })
}

exports.login = async (req, res) => {
    User.findOne({ email: req.body.email }, (async (err, user) => {
        if (err) {
            res.json({
                message: 'No account exists',
                error: err
            })
        } else {
            const isMatch = await user.validatePassword(req.body.password);
            if (isMatch) {
                var token = jwt.sign({user}, 'shhhhh');
                res.json({
                    message: 'Login Success',
                    data: user,
                    access_token: token
                })
            } else {
                res.json({
                    message: 'Password does not match',
                })
            }

        }
    }))
}