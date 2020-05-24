exports.getPosts = (req, res) => {
    res.json({
        posts: [{
                title: 'Első post'
            },
            {
                title: 'Második post'
            },
        ]
    });
};