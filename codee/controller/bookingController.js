const planModel = require("../models/planModel");
const userModel = require("../models/userModel");

let SK =
  "sk_test_51Kg20gSAWClFVh5nTuXhQREqF7hZ0ymmlvQ49DeD9j65YTOZQ1CNvoZwv8VsuuSyhlHDHwiJYIvYoE1gj6j6663z00YzAc8GbQ";
const stripe = require("stripe")(SK);

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let planId = req.params.id;
    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["cards"],
      customer_email: user.email,
      client_reference_id: plan.id,
      line_items: [
        {
          name: plan.name,
          description: plan.description,
          amount: plan.price * 50,
          currency: "inr",
          quantity: 1,
        },
      ],
      //dev->http
      //production->https
      success_url: `${req.protocol}://${req.get("host")}/profile`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
    });
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};
