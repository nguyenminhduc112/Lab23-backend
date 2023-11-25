const express = require('express')
const multer = require('multer');
const router = express.Router()
const configs = require('../config/multer')

const feedController = require('../controllers/feed')
const middlewareToken = require('../middlewares/middlewareToken')
const upload = multer({ storage: configs.storageMulter, fileFilter: configs.fileFilter });
// GET - /feed/posts
router.get('/posts', middlewareToken.verifyToken, feedController.getPosts)

// GET - /feed/post/:postId
router.get('/post/:postId', middlewareToken.verifyToken, feedController.getPost)

// POST - /feed/post
router.post('/post/', middlewareToken.verifyTokenAdmin, upload.single('image'), feedController.createPost)

// PUT - /feed/post/:postId
router.put('/post/:postId', middlewareToken.verifyTokenAdmin, upload.single('image'), feedController.updatePost)

// DELETE - /feed/post/:postId
router.delete('/post/:postId', middlewareToken.verifyTokenAdmin, feedController.deletePost)

module.exports = router