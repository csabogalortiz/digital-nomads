const express = require('express');
const router = express.Router();
const User = require("../models/User.model")
const saltRounds = 10
const bcrypt = require('bcryptjs')
const { isLoggedOut } = require('./../middleware/route-guard');

// Signup

router.get("/sign-up", isLoggedOut, (req, res, next) => {
    // res.send("Sign up here")
    res.render('auth/sign-up')

})

router.post("/sign-up", isLoggedOut, (req, res, next) => {
    const { userPwd } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))

})

// Login 

router.get("/log-in", isLoggedOut, (req, res, next) => {
    // res.send("Log in here")
    res.render('auth/log-in')

})

router.post("/log-in", isLoggedOut, (req, res, next) => {

    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            console.log({ user })
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email not found' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Wrong Password' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/home')
            }
        })
        .catch(error => next(error))
})

// Logout
router.get('/log-out', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router;
