const express = require("express");
const userModel = require("../models/userModel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_KEY = "skhsgdew938458dfusreh4548hfeuhhff848";
authRouter.route("/signup").get(middleware, getSignUp).post(postSignUp);
authRouter.route("/login").post(loginUser);
function middleware(req, res, next) {
  console.log("middleware encountered");
  next();
  //aa req res ni cycle ne todava mate pan upyog thayche  aano
}

function getSignUp(req, res) {
  res.sendFile("/foodApp/public/index.html", { root: __dirname });
}

async function postSignUp(req, res) {
  let obj = req.body;
  let user = await userModel.create(obj);
  res.json({
    message: "user signup successful",
    data: user,
  });
  console.log(user);
}
async function loginUser(req, res) {
  try {
    let data = req.body;
    let user = await userModel.findOne({ email: data.email });
    if (user) {
      if (user.password == data.password) {
        let uid = user["_id"]; //unique id
        let token = jwt.sign({ payload: uid }, JWT_KEY);
        res.cookie("login", token, { httpOnly: true });
        return res.json({
          message: "user has logged in",
          userDetails: data,
        });
      } else {
        return res.json({
          message: "wrong credentials",
        });
      }
    } else {
      return res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
module.exports = authRouter;
