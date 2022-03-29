const planModel = require("../models/planModel");
const reviewModel = require("../models/ReviewModel");
const { updatePlan } = require("./planController");

module.exports.getAllReviews = async function getPlanReviews(req, res) {
  try {
    const review = await reviewModel.find();
    if (review) {
      return res.json({
        message: "reviews retrieved",
        data: review,
      });
    } else {
      return res.json({
        message: "review not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.top3Reviews = async function top3Reviews(req, res) {
  try {
    const review = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (review) {
      return res.json({
        message: "reviews retrieved",
        data: review,
      });
    } else {
      return res.json({
        message: "review not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    //plan click ==> corresponding review should display
    let id = req.params.id;
    let reviews = await reviewModel.find();
    let review = reviews.filter(review => review.plan._id == id);
    res.json({
      message: "all review that related to this plan is fetched",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//aama baki che thoduk
module.exports.createReview = async function createReview(req, res) {
  try {
    let id = req.params.plan;
    let plan = await planModel.findById(id);
    let reviewData = req.body;
    // console.log(reviewData);
    let review = await reviewModel.create(reviewData);
    plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2;
    await plan.save();

    return res.json({
      message: "reviews received",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.updateReview = async function updateReview(req, res) {
  try {
    let planid = req.params.id;
    let id = req.body.id;
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      if (key == "id") continue;
      keys.push(key);
    }
    let review = await reviewModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await review.save();
    return res.json({
      message: "plan updated successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    let planid = req.params.id;
    let id = req.body.id;
    let review = await reviewModel.findByIdAndDelete(id);
    res.json({
      message: "review deleted successfully",
      data: review,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
