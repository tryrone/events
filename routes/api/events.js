const express = require("express");
const router = express.Router();

// @route   GET api/post/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Events Works" }));

module.exports = router;
