const express = require('express');
const { isLoggedOut } = require('../middleware/route-guard');
const Place = require('./../models/Place.model');
const router = express.Router();


router.get("/", isLoggedOut, (req, res, next) => {
  res.render("index");
});

// // /* GET home page */
// router.get("/home", (req, res, next) => {

//   res.render("home");
//   // res.send("Home goes here")
// });


router.get('/home', (req, res, next) => {
  // res.send("Place List goes here")

  Place
    .find()
    // .select({ name: 1 })
    .then(places => {
      res.render("home", {
        places,
        isADMIN: req.session.currentUser.role === 'ADMIN'
      })
    })
    .catch(error => { next(error) })
})
module.exports = router;


