const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
// POST - /auth/signin
router.post('/signin', authController.postLogin)

// POST - /auth/signup
router.post('/signup', authController.postSignup)

// POST - /auth/logout
// router.post('/logout', authController.postLogout)

module.exports = router