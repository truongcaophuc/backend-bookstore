
const express = require("express");
const app = express();
const cors=require('cors')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const dotenv = require('dotenv');
const path = require("path");

const errorMiddleware = require("./middlewares/errors");
app.use(cors(
  {
    origin: 'https://book-store-sandy.vercel.app/', 
    credentials: true,
  }
))
// Setting up config file
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "config/config.env" });
// dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");
const category = require("./routes/category");
//app.use("/",(req,res,next)=>{res.json({name:2})})
app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);
app.use("/api/v1", category);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}
// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
