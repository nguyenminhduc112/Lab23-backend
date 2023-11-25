const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

// Tạo model từ schema
const postModel = mongoose.model('Post', postSchema);

// Xuất model để sử dụng trong ứng dụng của bạn
module.exports = postModel;