const express = require('express');
const router = express.Router();
const { findByIdAndUpdate, findByIdAndDelete } = require("./../models/Place.model")
const Place = require('./../models/Place.model')
const { isLoggedIn } = require('./../middleware/route-guard')
const User = require('./../models/User.model')

// Place list - Toca hacerlo diferente por el tema de la api 

router.get('/list', (req, res, next) => {
    // res.send("Place List goes here")
    Place
        .find()
        .then(places => {
            res.render("places/list", { places })
        })
        .catch(err => console.log(err))
})


// Create Place - Form -  (render)  
router.get('/create', (req, res, next) => {
    res.render('places/create')

})

// Create Place - Form -  (hanlde)  
router.post('/create', (req, res, next) => {
    const { name, type, latitude, longitude } = req.body
    const owner = req.session.currentUser._id
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Place
        .create({ name, type, location, owner })
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

// Owned place list
router.get('/my-places', isLoggedIn, (req, res) => {

    // res.send("holi")
    Place
        .find({ owner: req.session.currentUser._id })
        // .select({ name: 1 })
        .then(places => {
            res.render('places/my-places', { places })
        })
        .catch(err => console.log(err))
})


module.exports = router