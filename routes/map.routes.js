const express = require('express');
const router = express.Router();
const Place = require('./../models/Place.model');

//  Map 
router.get('/places', (req, res, next) => {
    console.log('llega algo aquii?????', req.query)
    Place
        .find(req.query)
        .then(places => {
            res.render('explore/map', { places })
        })
        .catch(err => console.log(err))
})




module.exports = router

