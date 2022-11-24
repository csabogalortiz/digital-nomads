const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const uploader = require('./../config/uploader.config')
const { isLoggedIn } = require('./../middleware/route-guard')


//Nomads List
router.get('/users-list', (req, res, next) => {

    User
        .find()
        .then(nomads => {
            res.render('user/users-list', { nomads })
        })
        .catch(err => console.log(err))
})

//Nomad Profile
router.get('/profile/:user_id', (req, res, next) => {

    const { user_id } = req.params



    User
        .findById(user_id)
        .populate('favPlaces friends createdPlaces')
        .then(nomad => {
            res.render('user/profile', {
                nomad,
                isADMIN: req.session.currentUser.role === 'ADMIN',
                isAA: req.session.currentUser.role === 'AA',
                isNOMAD: req.session.currentUser.role === 'NOMAD'

            })
            console.log({ nomad })
        })
        .catch(err => console.log(err))
})



// Edit Nomad (render)
router.get('/profile/:user_id/edit', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(nomad => {
            res.render('user/edit-user-profile', nomad)
        })
        .catch(err => console.log(err))
})

// Edit Nomad (handle)
router.post('/profile/:user_id/edit', uploader.single('imageField'), (req, res, next) => {

    const { name, username, email, bio, links, savedPlaces } = req.body
    const { user_id } = req.params
    const { path: profileImg } = req.file

    User
        .findByIdAndUpdate(user_id, { name, username, email, profileImg, bio, links, savedPlaces })
        .then(() => res.redirect(`/user/profile/${user_id}`))
        .catch(err => console.log(err))
})

//Delete Nomad (handle)
router.post('/profile/:user_id/delete', (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

// Fav Places
router.get('/:user_id/fav-places', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate('favPlaces')
        .then(nomad => {
            res.render('user/fav', nomad)
            console.log({ nomad })

        })

        .catch(err => console.log(err))

})

router.post('/:user_id/fav-places/:place_id', (req, res, next) => {

    const { user_id } = req.params
    const { place_id } = req.params

    User
        .findByIdAndUpdate(user_id, { "$addToSet": { "favPlaces": place_id } })
        .then(() => res.redirect('/explore/places'))
})

// Friend List 
router.get('/:user_id/friend-list', (req, res, next) => {
    // res.send('Friend List Goes Here')

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate('friends')
        .then(nomad => {
            res.render('user/friend-list', nomad)
        })
        .catch(err => console.log(err))

})

router.post('/:user_id/friend-list', (req, res, next) => {

    const { _id } = req.session.currentUser
    const { user_id } = req.params

    User
        .findByIdAndUpdate(_id, { "$addToSet": { "friends": user_id } })
        .then(() => res.redirect('/user/users-list'))
})



module.exports = router