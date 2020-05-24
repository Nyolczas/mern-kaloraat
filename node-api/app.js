const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config()

//db
//MONGO_URI=mongodb://localhost/nodeapi
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err}`);
});

//bring in routes
const postRoutes = require("./routes/post");

// middlewares
app.use(morgan("dev"));
app.use("/", postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A szerver a ${port} számú porton fut`);
});