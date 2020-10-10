const Post = require('../models/Post');
let uuidv1 = require('uuidv1');
const formidable = require('formidable');
const fs = require('fs');

//console.log(uuidv1())

//--- read
exports.getPosts = (req, res) => {
  const posts = Post.find()
    .select('_id title body')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
};

//--- create
exports.createPost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: ' A képet nem sikerült feltölteni',
      });
    }
    let post = new Post(fields);
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
  const post = new Post(req.body);
  post.save().then((result) => {
    res.json({
      post: result,
    });
  });
};
