const router = require("express").Router()

const Place = require('../models/Place.model')

router.get('/places', (req, res, next) => {

    const { type } = req.query

    // console.log('------', type)

    Place
        .find({ type })
        .then(places => {
            // console.log('que cojones llegas aquiiiS', places)
            res.json(places)
        })

        .catch(err => console.log(err))
})

module.exports = router

