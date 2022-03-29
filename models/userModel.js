const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// const db_link =
//   "mongodb+srv://ashish:2201@cluster0.cgjpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// mongoose
//   .connect(db_link)
//   .then(function (db) {
//     // console.log(db);
//     console.log("db is connected");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //aa unique aetle ke banel mail thi farithi nanai no sake ne account aetle
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: false,
    minLength: 8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantOwner", "deliveryBoy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/users/default.jpeg",
  },
  resetToken: String,
});
userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});
// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashString = await bcrypt.hash(this.password, salt);
//   console.log(hashString);
//   this.password = hashString;
// });

userSchema.methods.createResetToken = function () {
  //creating unique token using npm i crypto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
};

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
