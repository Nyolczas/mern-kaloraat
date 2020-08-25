const jwt = require("jsonwebtoken");
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require("../models/user");

exports.signup = async (req,res) => {
    const userExist = await User.findOne({email: req.body.email})
    if(userExist) return res.status(403).json({
        error: "Ez az email már foglalt!"
    })

    const user = await new User(req.body)
    await user.save()
    res.status(200).json({ message: "Sikeres regisztráció! Jelentkezz be!" });
};

exports.signin = (req, res) => {
    // find the user based on email address
    const { email, password} = req.body;
    User.findOne({email}, (err, user) => {
        // if err or no user
        if(err || !user) {
            return res.status(401).json({
                error: "A felhasználó ezzel az email címmel nem létezik. Jelentkezz be!"
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in model use here
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Az email vagy a jelszó nem megfelelő!"
            });
        }
        // generate a token with id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, {expire: new Date() + 9999});
        // return response with user and token to frontend client     
        const {_id, name, email} = user;
        return res.json({token, user: {_id, email, name}});   
    })
};

exports.signout = (req, res) => {
    res.clearCookie('t')
    return res.json({message: 'Sikeres kijelentkezés!'});
}

exports.requireSignin = expressJwt({ 
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
})