const mongoose = require("mongoose");
const { Schema } = mongoose;

const _Schema = new Schema({
  firstName: String,
  email: String,
});

module.exports = {
  ProfileModel: mongoose.model("Profile", _Schema),
};
