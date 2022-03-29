const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utility/nodeMailer");
const JWT_KEY = "skhsgdew938458dfusreh4548hfeuhhff848";
//sign up user
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    sendMail("signup", user);
    if (!user) {
      res.json({
        message: "some error with db",
      });
    }
    res.json({
      message: "user sign up",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//login user
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        if (user.password == data.password) {
          let uid = user["_id"]; //unique id
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "user has logged in",
            userDetails: user,
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
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//authorize function ---> to check the user's role
module.exports.isAuthorized = function isAuthorized(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };
};

//protectRoute
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        return res.json({
          message: "user not verified",
        });
      }
    } else {
      //browser
      const client = req.get("User-Agent");
      if (client.includes("Mozilla") == true) {
        return res.redirect("/login");
      }
      return res.json({
        message: "please login first",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//forgetPassword
module.exports.forgetpassword = async function forgetpassword(req, res) {
  let { emailU } = req.body;
  try {
    const user = await userModel.findOne({ email: emailU });
    if (user) {
      const resetToken = user.createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      //send email to user
      //node mailer
      let obj = {
        resetPasswordLink: resetPasswordLink,
        email: emailU,
      };
      sendMail("resetpassword", obj);
      res.json({
        message: "link sended successfully",
        data: obj,
      });
    } else {
      return res.json({
        message: "please signup first",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//resetPassword
module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    //reset password Handler will update user in db
    if (user) {
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      return res.json({
        message: "password changed successfully please login again",
      });
    } else {
      return res.json({
        message: "please reset the password with your valid link",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//logout function
module.exports.logout = function logout(req, res) {
  res.cookie("login", "", { maxAge: 1 });
  res.json({
    message: "user logged out successfully",
  });
};
