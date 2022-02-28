const mongoose = require("mongoose");
const { Schema } = mongoose;

const _Schema = new Schema({
  fileName: String,
  url: String,
});

module.exports = {
  FileModel: mongoose.model("File", _Schema),
};
