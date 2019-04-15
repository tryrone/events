const express = require("express");
const router = express.Router();
const passport = require("passport");

//Bringing in event model
const Event = require("../../models/Event");

//Load Profile model
const Profile = require("../../models/Profile");

//Events field validation
const validateEventInput = require("../../validation/event");

router.get("/test", (req, res) => {
  res.json("test works");
});

// @route   GET api/events
// @desc    Get current users events
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Event.findOne({ user: req.user.id })
      .then(event => {
        if (!event) {
          errors.noevent = "No event has been created by this user";
          return res.status(404).json(errors);
        }
        res.json(event);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/events/all
// @desc    Get all events created
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  //Find all events
  Event.find()
    .populate("user", "name")
    .then(events => {
      if (!events) {
        errors.noevents = "There are no events to be displayed";
        return res.status(404).json(errors);
      }

      res.json(events);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/event
// @desc    Create or edit events
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const eventsFields = {};
    eventsFields.user = req.user.id;
    if (req.body.handle) eventsFields.handle = req.body.handle;
    if (req.body.description) eventsFields.description = req.body.description;
    if (req.body.location) eventsFields.location = req.body.location;
    if (req.body.starts) eventsFields.starts = req.body.starts;
    if (req.body.ends) eventsFields.ends = req.body.ends;
    if (req.body.dateofevent) eventsFields.dateofevent = req.body.dateofevent;

    // Ticket
    eventsFields.tickets = {};
    if (req.body.ticketname)
      eventsFields.tickets.ticketname = req.body.ticketname;
    if (req.body.type) eventsFields.tickets.type = req.body.type;
    if (req.body.quantity) eventsFields.tickets.quantity = req.body.quantity;

    Event.findOne({ user: req.user.id }).then(event => {
      if (event) {
        // Update
        Event.findOneAndUpdate(
          { user: req.user.id },
          { $set: eventsFields },
          { new: true }
        ).then(event => res.json(event));
      } else {
        // Create

        // Check if handle exists
        Event.findOne({ handle: eventsFields.handle })
          .then(event => {
            if (event) {
              errors.handle = "That event name already exists";
              res.status(400).json(errors);
            }

            // Save Event
            new Event(eventsFields).save().then(event => res.json(event));
            event
              .findOneAndUpdate(
                { id: req.user.id },
                { $inc: { count: 1 } },
                { new: true }
              )
              .then(count => {
                res.json(count);
              });
          })
          .catch(err => res.json(err));
      }
    });
  }
);

// @route   DELETE api/events
// @desc    Delete events
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Event.findOneAndRemove({ user: req.user.id }).then(() =>
      res.json({ success: true })
    );
  }
);

// @route   POST api/events/like/:id
// @desc    like events
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          if (
            event.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            res
              .status(400)
              .json({ alreadyliked: "you have already liked this event" });
          }

          //add user id to likes array
          event.likes.unshift({ user: req.user.id });

          event.save().then(event => res.json(event));
        })
        .catch(err => res.status(404).json({ postnotfound: "No event found" }));
    });
  }
);

// @route   POST api/events/unlike/:id
// @desc    unlike events
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          if (
            event.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            res
              .status(400)
              .json({ notliked: "you have not yet liked this event" });
          }

          //Get the remove index
          const removeIndex = event.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice or remove out of the array
          event.likes.splice(removeIndex, 1);

          //save
          event.save().then(event => res.json(event));
        })
        .catch(err => res.status(404).json({ postnotfound: "No event found" }));
    });
  }
);

module.exports = router;
