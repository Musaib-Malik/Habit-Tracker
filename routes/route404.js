// Import npm modules
const express = require("express");
const router = express.Router();

// @desc       Show 404 page
// @route      GET /*
router.get("/", (req, res) => {
  res.render("404");
});

// Export router
module.exports = router;
