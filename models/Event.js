const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  description: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  image: {
    data: Buffer,
    contentType: String
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
    type: Date,
    hour: {
      type: Date.getHours(),
      required: true
    },
    minutes: {
      type: Date.getMinutes()
    },
    required: true
  },
  ends: {
    type: Date,
    hour: {
      type: Date.getHours(),
      required: true
    },
    minutes: {
      type: Date.getMinutes()
    }
  },
  tickets: [
    {
      name: {
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
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Event = mongoose.model("events", EventSchema);
