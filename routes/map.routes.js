const express = require('express');
const router = express.Router();

//  Map 
router.get('/places', (req, res, next) => {
    res.render('explore/map')
})

module.exports = router

