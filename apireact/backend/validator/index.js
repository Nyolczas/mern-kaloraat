exports.createPostValidator = (req, res, next) => {
    // title
    req.check('title', "Írj egy címet!").notEmpty()
    req.check('title', "a cím hossza minimum 4, maximum 150 karakter legyen!").isLength({
        min: 4,
        max: 150
    });
    // body
    req.check('body', "Írd meg a bejegyzést!").notEmpty()
    req.check('body', "a bejegyzés hossza minimum 4, maximum 2000 karakter legyen!").isLength({
        min: 4,
        max: 2000
    });
    // check for errors
    const errors = req.validationErrors()
    // if error the first one as they happen 
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({
            error: firstError
        })
    }
    // proceed to next middleware
    next();
};

exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "A név megadása kötelező!").notEmpty();
    // email is not null, valid and normalized 
    req.check("email", "Az email cím hossza 4 és 200 karakter között legyen!")
    .matches(/.+\@.+\..+/)
    .withMessage("Az emailnek tartalmaznia kell @ jelet")
    .isLength({
        min: 4,
        max: 200
    })
    // check for password 
    req.check("password", "A jelszó megadása kötelező!").notEmpty();
    req.check("password")
    .isLength({min: 6})
    .withMessage("A jelszó hossza minimum 6 karakter legyen!")
    .matches(/\d/)
    .withMessage("A jelszónak tartalmaznia kell számot is!")
    // check for errors
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({
            error: firstError
        });
    }
    //proceed to next middleware
    next();
}