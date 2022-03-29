const userModel = require("../models/userModel");
module.exports.getAllUser = async function getAllUser(req, res) {
  let users = await userModel.find();
  if (users) {
    res.json({
      message: "user retrieved",
      data: users,
    });
  }
  res.json({
    message: "user not found",
  });
};
module.exports.getUser = async function getUser(req, res) {
  // console.log(req);
  let id = req.id;
  console.log(id);
  let user = await userModel.findById(id);
  console.log(user);
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "user not found",
    });
  }
};
module.exports.updateUser = async function updateUser(req, res) {
  let id = req.params.id;
  let user = await userModel.findById(id);
  let dataToBeUpdated = req.body;
  try {
    if (user) {
      // console.log(user);
      let keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }
      console.log(keys);
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      console.log(user);
      await user.save();
      // console.log(updatedData);
      res.json({
        message: "data updated successfully",
        newData: user,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    res.json({
      message: "data has been deleted",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
