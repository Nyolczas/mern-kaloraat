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