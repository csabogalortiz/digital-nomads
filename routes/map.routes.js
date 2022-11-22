const express = require('express');
const router = express.Router();
const Place = require('./../models/Place.model');

//  Map 
router.get('/places', (req, res, next) => {
    Place
        .find()
        .then(places => {
            res.render("places/list", { places })
        })
    //     .catch(err => console.log(err))
    res.render('explore/map')
})




module.exports = router

