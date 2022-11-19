const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn } = require('./../middleware/route-guard')

//Nomads List

router.get('/users-list', (req, res, next) => {
    // res.send('hola soy list')
    User
        .find()
        .then(users => {
            res.render('user/users-list', { users })
        })
        .catch(err => console.log(err))
})

//User Profile
router.get('/profile/:user_id', (req, res, next) => {
    res.send('hola soy profile')
    const { user_id } = req.params

    //     User
    //         .findById(user_id)
    //         .then(user => {
    //             console.log({
    //                 isNOMAD: req.session.currentUser.role
    //             })
    //             res.render('user/profile', {
    //                 user,
    //                 isADMIN: req.session.currentUser.role === 'ADMIN',
    //                 isAA: req.session.currentUser.role === 'AA',
    //                 isNOMAD: req.session.currentUser.role === 'NOMAD'
    //             })
    //                 .catch(err => console.log(err))
    //         })
})

// //Edit User (render)
// router.get('/profile/:user_id/edit', (req, res, next) => {
//     // res.send('soy edit')
//     const { user_id } = req.params

//     User
//         .findById(user_id)
//         .then(user => {
//             res.render('user/edit-user-profile', user)
//         })
//         .catch(err => console.log(err))
// })

// // // Edit User (handle)
// router.post('/profile/:user_id/edit', (req, res, next) => {
//     // console.log('entro aqui')
//     const { name, username, email, profileImg, bio, links, savedPlaces } = req.body
//     const { user_id } = req.params
// })







// router.post('/:user_id/edit', (req, res) => {
//     // console.log('entro aqui')
//     // res.send('hola')

//     const { username, email, profileImg, description } = req.body
//     const { user_id } = req.params

//     User
//         .findOneAndUpdate(user_id, { username, email, profileImg, description })
//         .then(() => res.redirect(`/students/profile/${user_id}`))
//         .catch(err => console.log(err))
// })


// // Delete Student (handle)

// router.post('/:user_id/delete', (req, res) => {

//     const { user_id } = req.params

//     User

//         .findByIdAndDelete(user_id)
//         .then(() => res.redirect('/students/students-list'))
//         .catch(err => console.log(err))

// });



module.exports = router
