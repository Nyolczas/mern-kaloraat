const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

//db
//MONGO_URI=mongodb://localhost/nodeapi
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err}`);
});

//bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Ehhez nincs jogosultságod!'});
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A szerver a ${port} számú porton fut`);
});
