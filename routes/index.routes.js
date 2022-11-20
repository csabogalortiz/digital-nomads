const express = require('express');
const router = express.Router();

/* GET Log in page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// /* GET home page */
router.get("/home", (req, res, next) => {
  res.render("home");
  // res.send("Home goes here")
});

module.exports = router;
