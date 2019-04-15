const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Profile model
const Profile = require("../../models/Profile");

//Load Event model
const Event = require("../../models/Event");

//Load User model
const User = require("../../models/User");

//Load profile input validator
const validateProfileInput = require("../../validation/profile");

// @route   GET api/profile/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get Current profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", "name")
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile found for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create of Edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    //get fields from form input
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.address) profileFields.address = req.body.address;
    if (req.body.bio) profileFields.bio = req.body.bio;
    //Social networks
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // we want to update the profile because it already exists
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create a profile because it does not yet exists
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);
// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Event.findOne({ user: req.user.id })
      .then(event => {
        if (event) {
          errors.event = "You have to delete your events first";
          res.json(errors);
        }
      })
      .catch(err => res.json(err))
      .then(
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
          User.findOneAndRemove({ _id: req.user.id }).then(() =>
            res.json({ success: true })
          );
        })
      );
  }
);
module.exports = router;
