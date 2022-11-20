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
    // res.send('soy edit')
    const { user_id } = req.params

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
        .then(() => res.redirect('user/users-list'))
        .catch(err => console.log(err))
})


module.exports = router
