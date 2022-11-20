const express = require('express');
const router = express.Router();
const { findByIdAndUpdate, findByIdAndDelete } = require("./../models/Place.model")
const Place = require('./../models/Place.model')

// Place list - Toca hacerlo diferene por el tema de la api 

router.get('/list', (req, res, next) => {
    // res.send("Place List goes here")
    Place
        .find()
        .then(places => {
            res.render("places/list-places", { places })
        })
        .catch(err => console.log(err))
})


// Create Place - Form -  (render)  
router.get('/create', (req, res, next) => {
    res.render('places/create')

})

// Create Place - Form -  (hanlde)  
router.post('/create', (req, res, next) => {
    const { name, type, description, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Place
        .create({ name, type, description, location })
        .then(() => {
            res.redirect('/explore/places')
        })
        .catch(err => console.log(err))
})


// Edit Place - Form - (render)

router.get("/edit/:id", (req, res, next) => {
    // res.send("edit your place here")
    const { id: place_id } = req.params

    Place
        .findById(place_id)
        .then(place => {
            res.render('places/edit', place)
        })
        .catch(err => console.log(err))
})

// Edit Place - Form - (handle)

router.post("/edit/:id", (req, res, next) => {

    const { id: place_id } = req.params
    const { name, type, description } = req.body

    Place
        .findByIdAndUpdate(place_id, { name, type, description })
        .then(() => {
            res.redirect('/explore/map')
        })
        .catch(err => console.log(err))
})

// Delete 

router.post('/delete/:id', (req, res, next) => {

    const { id: place_id } = req.params
        .findByIdAndDelete(place_id)
        .then(() => {

            res.redirect('/places/list')

        })
        .catch(err => console.log(err))
})



module.exports = router