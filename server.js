const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const events = require("./routes/api/events");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

//Passport strategy
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/events", events);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
