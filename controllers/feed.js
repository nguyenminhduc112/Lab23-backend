// Import Modal 
const postModel = require('../models/post')
const { deleteFile } = require('../utils/file')
const io = require('../config/socket')
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await postModel.find({})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    } 1
}

exports.getPost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const post = await postModel.findById(postId)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.createPost = async (req, res, next) => {
    try {
        const { jsonData } = req.body
        const body = JSON.parse(jsonData)
        const title = body.title
        const content = body.content
        const image = req.file
        if (image) {
            const post = await postModel({ title: title, content: content, imageUrl: image.path })
            await post.save()
            io.getIO().emit('posts', { action: 'create' })
            res.status(201).json({
                message: 'Post Created Successly!',
            })
        } else {
            res.status(401).json({ message: 'That is not IMG' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server have error' })
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { jsonData } = req.body
        const body = JSON.parse(jsonData)
        const postId = req.params.postId
        const title = body.title
        const content = body.content
        const image = req.file
        if (image) {
            // Delete IMG 
            const postId = req.params.postId
            const post = await postModel.findById(postId)
            deleteFile(post.imageUrl)
            // Update Post
            await postModel.findByIdAndUpdate(postId, { title: title, content: content, imageUrl: image.path, updateAt: Date.now() })
            io.getIO().emit('posts', { action: 'update' })
            res.status(201).json({
                message: 'Post Updated Successly!',
            })
        } else {
            await postModel.findByIdAndUpdate(postId, { title: title, content: content, updateAt: Date.now() })
            io.getIO().emit('posts', { action: 'update' })
            res.status(201).json({
                message: 'Post Updated Successly!',
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server have error' })
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        // Delete IMG 
        const post = await postModel.findById(postId)
        deleteFile(post.imageUrl)
        // Delete Post
        await postModel.findByIdAndDelete(postId)
        io.getIO().emit('posts', { action: 'delete' })
        res.status(200).json({
            message: 'Deleted Post Successly!',
        })
    } catch (error) {
        res.status(500).json({ message: 'Server have error' })
    }
}