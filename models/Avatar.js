const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const AvatarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  avatar: {
    data: Buffer,
    contentType: String
  },
  path: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Avatar = mongoose.model("avatar", AvatarSchema);
