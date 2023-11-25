const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

// Tạo model từ schema
const userModel = mongoose.model('User', userSchema);

// Xuất model để sử dụng trong ứng dụng của bạn
module.exports = userModel;