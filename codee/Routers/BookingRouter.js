const express = require("express");
const { protectRoute } = require("../controller/authController");
const { createSession } = require("../controller/bookingController");
const bookingRouter = express.Router();
// bookingRouter.use(protectRoute);
bookingRouter.get("/createSession", function (req, res) {
  res.sendFile("D:/pep_CODING/code/foodApp/public/index2.html");
});
bookingRouter.route("/createSession").post(createSession);

module.exports = bookingRouter;
