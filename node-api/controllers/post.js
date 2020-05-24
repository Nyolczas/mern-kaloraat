const Post = require("../models/Post");

//--- read
exports.getPosts = (req, res) => {
  res.json({
    posts: [
      {
        title: "Első post",
      },
      {
        title: "Második post",
      },
    ],
  });
};

//--- create
exports.createPost = (req, res) => {
  const post = new Post(req.body);
  //console.log("creating post: ", req.body);
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      post: result,
    });
  });
};
