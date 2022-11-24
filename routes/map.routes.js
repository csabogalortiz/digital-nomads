const express = require('express');
const router = express.Router();
const Place = require('./../models/Place.model');

//  Map 
router.get('/places', (req, res, next) => {

    const favs = req.session.currentUser.favPlaces

    Place
        .find()
        .then(places => {

            const formattedPlaces = places.map(elm => {

                const stringID =

                    console.log(elm._id.toString())
                console.log(favs)
                console.log(favs.includes(elm._id.toString()))
                console.log('------')

                return { ...elm._doc, isFav: false }
            })

            console.log('----------', formattedPlaces)

            res.render('explore/map', { user: req.session.currentUser._id, places: formattedPlaces })
        })
        .catch(error => { next(error) })
})




module.exports = router

