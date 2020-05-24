const Post = require("../models/Post");

//--- read
exports.getPosts = (req, res) => {
  const posts = Post.find()
    .select("_id title body")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
};

//--- create
exports.createPost = (req, res) => {
  const post = new Post(req.body);
  post.save().then((result) => {
    res.json({
      post: result,
    });
  });
};
