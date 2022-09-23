const jwt = require('jsonwebtoken');
const User = require('../models/user');
const test = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
        try {
            const verify = await jwt.verify(token, 'shhhhh');
            if (verify.iat) {
                var date = new Date(verify?.iat * 1000);
                const dateToday = new Date();
                if (dateToday.getTime() - date.getTime() > 30 * 60 * 1000) {
                    res.json({
                        message: 'Token expired'
                    })
                } else {
                    let found = await User.findById(verify.user._id);
                    if (found) {
                        next();
                    }
                }

            } 
        } catch (err) {
            res.json({
                error: 'Unautharized Token'
            })
        }


    } else {
        res.json({
            error: 'Please send authorization token'
        })
    }

}


module.exports = test;