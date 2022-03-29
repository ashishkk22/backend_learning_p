const express = require("express");
const userRouter = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
} = require("../controller/userController");
const multer = require("multer");
const {
  signup,
  login,
  isAuthorized,
  protectRoute,
  logout,
  forgetpassword,
  resetpassword,
} = require("../controller/authController");

//user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

userRouter.route("/forgetpassword").post(forgetpassword);
userRouter.route("/resetpassword/:token").post(resetpassword);

//multer for fileUpload
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Data.now()}.jpeg`);
  },
});
const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image ! please select an image file"), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: filter,
});

userRouter.route("/logout").get(logout);
//profile page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific work
userRouter.use(isAuthorized(["admin"]));
userRouter.route("").get(getAllUser);

module.exports = userRouter;
