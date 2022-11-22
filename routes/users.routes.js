const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn } = require('./../middleware/route-guard')



//Nomads List
router.get('/users-list', (req, res, next) => {
    // res.send('hola soy list')
    User
        .find()
        .then(nomads => {
            res.render('user/users-list', { nomads })
        })
        .catch(err => console.log(err))
})

//Nomad Profile
router.get('/profile/:user_id', (req, res, next) => {
    // res.send('hola soy profile')
    const { user_id } = req.params
    // console.log(req.session.currentUser)
    User
        .findById(user_id)
        .then(nomad => {
            console.log({
                isNOMAD: req.session.currentUser.role
            })
            res.render('user/profile', {
                nomad,
                isADMIN: req.session.currentUser.role === 'ADMIN',
                isAA: req.session.currentUser.role === 'AA',
                isNOMAD: req.session.currentUser.role === 'NOMAD'
            })
        })
        .catch(err => console.log(err))
})
// Edit Nomad (render)
router.get('/profile/:user_id/edit', (req, res, next) => {

    const { user_id } = req.params
    // res.send('soy edit')
    User
        .findById(user_id)
        .then(nomad => {
            res.render('user/edit-user-profile', nomad)
        })
        .catch(err => console.log(err))
})
// // // Edit Nomad (handle)
router.post('/profile/:user_id/edit', (req, res, next) => {
    const { name, username, email, profileImg, bio, links, savedPlaces } = req.body
    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { name, username, email, profileImg, bio, links, savedPlaces })
        .then(() => res.redirect('user/profile/${user_id}'))
        .catch(err => console.log(err))
})
//Delete Nomad (handle)
router.post('/:user_id/delete', (req, res, next) => {
    const { user_id } = req.params
    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

// Fav Places
router.get('/:user_id/fav-places', (req, res, next) => {

    const { user_id } = req.params
    // res.send('soy edit')
    User
        .findById(user_id)
        .populate('favPlaces')
        .then(nomad => {
            console.log(nomad)
            res.render('user/fav', nomad)
        })
        .catch(err => console.log(err))


})

router.post('/:user_id/fav-places/:place_id', (req, res, next) => {
    const { user_id } = req.params
    const { place_id } = req.params
    User
        .findByIdAndUpdate(user_id, { "$addToSet": { "favPlaces": place_id } })
        .then(() => res.redirect('/places/list'))
})



module.exports = router