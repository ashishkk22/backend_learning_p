const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://ashish:2201@cluster0.cgjpv.mongodb.net/instaEats?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("db is connected");
  })
  .catch(function (err) {
    console.log(err);
  });
app.use(express.json());
app.listen(3000);
app.use(cookieParser());
const userRouter = require("./foodApp/Routers/userRouter");
const authRouter = require("./foodApp/Routers/authRouter");
const planRouter = require("./foodApp/Routers/planRouter");
const reviewRouter = require("./foodApp/Routers/reviewRouter");
const bookingRouter = require("./foodApp/Routers/BookingRouter");
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
app.use("/booking", bookingRouter);
