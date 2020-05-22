const express = require("express");
const app = express();
const morgan = require("morgan");
const { getPosts } = require("./routes/post");

const myOwnMiddleware = (req, res, next) => {
  console.log("Baszom sorba a Middleware-eidet!");
  next();
};

// middlewares
app.use(morgan("dev"));
app.use(myOwnMiddleware);

// routes
app.get("/", getPosts);

const port = 3000;
app.listen(port, () => {
  console.log(`A szerver a ${port} számú porton fut`);
});
