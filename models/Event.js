const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  location: {
    type: String,
    required: true
  },
  starts: {
    type: String,
    required: true
  },
  ends: {
    type: String
  },
  dateofevent: {
    type: String,
    required: true
  },
  tickets: {
    ticketname: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  count: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Event = mongoose.model("events", EventSchema);
