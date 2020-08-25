const User = require("../models/user");

exports.userById = (req, res, next) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(401).json({
                error: 'User not found'
            })
        }
        req.profile = user // adds profile object in req with user info
    })
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized) {
        return res.status(403).json({
            error: 'A felhasználónak nincs jogosultsága ehhez!'
        });
    }
}