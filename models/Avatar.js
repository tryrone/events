const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const AvatarSchema = new Schema({
  avatar: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Avatar = mongoose.model("avatar", AvatarSchema);
