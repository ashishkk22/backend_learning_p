//mongoose ke threw connect mongodb
const mongoose = require("mongoose");
// const db_link =
//   "mongodb+srv://ashish:2201@cluster0.cgjpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// mongoose
//   .connect(db_link)
//   .then(function (db) {
//     // console.log(db);
//     console.log("plan db is connected");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "plane name should not exceed more than 20 characters"],
    //aa je ahiya  je warning aapi che ne te user ne samjay aevi set kari che
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratingsAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: function () {
      return this.discount < 65;
    },
  },
});

const planModel = mongoose.model("planModel", planSchema);

async function createPlan() {
  let planObj = {
    name: "superFood2",
    duration: 30,
    price: 1000,
    ratingsAverage: 5,
    discount: 20,
  };
  //with method 1
  //   let data = await planModel.create(planObj);
  //   console.log(data);
  //with method 2
  const doc = new planModel(planObj);
  await doc.save();
}

module.exports = planModel;
