const express = require("express");
const planRouter = express.Router();
const { protectRoute, isAuthorized } = require("../controller/authController");
const {
  getAllPlans,
  getPlan,
  createPlan,
  deletePlan,
  updatePlan,
  top3Plans,
} = require("../controller/planController");

//all plans laine aavse
planRouter.route("/allPlans").get(getAllPlans);

//own plan -->logged in necessary
planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);

//admin and restaurant  owner can change the plans
planRouter.use(isAuthorized(["admin"]));
planRouter.route("/crudPlan").post(createPlan);
planRouter.route("/crudPlan/:id").patch(updatePlan).delete(deletePlan);

planRouter.route("/top3plan").get(top3Plans);
module.exports = planRouter;
