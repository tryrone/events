const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//importing the User model
const User = require("../../models/User");
//importing tha Avatar model
const Avatar = require("../../models/Avatar");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/register
// @desc    Registers users
// @access  Public
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            res.json(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//Multer Storage Engine
const storage = multer.diskStorage({
  destination: "./public/avatar/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

//Initialize upload
const upload = multer({
  storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("avatar");

// File Type Check
function checkFileType(file, cb) {
  //Allowed extension
  const filetypes = new RegExp("jpeg|jpg|png|gif");
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: image only");
  }
}

// @route   GET api/users/avatar
// @desc    Tests users route
// @access  Public
router.post("/avatar", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      //catch block for if no file is selected
      if (req.file == undefined) {
        res.status(400).json({ msg: "no file selected" });
      } else {
        //variables for Avatar database
        const newAvatar = new Avatar({
          avatar: req.file.filename,
          path: req.file.path
        });
        //save into Avater db
        newAvatar.save().catch(err => console.log(err));
        console.log(req.file);
        res.json({ msg: "image uploaded" });
      }
    }
  });
});

// @route   GET api/users/login
// @desc    Login user // Returning Jwt Token
// @access  Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  //find User by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    //Check for matching passwords
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //Jwt payload
        const payload = {
          id: user.id,
          name: user.name
        };
        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              res.json(err);
            }
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        return res.status(400).json({ password: "password is incorrect" });
      }
    });
  });
});
module.exports = router;
