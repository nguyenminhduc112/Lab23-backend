const bcrypt = require('bcrypt');
const User = require('../models/user')
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.status(500).json({ message: 'Error comparing passwords:' + err })
                    } else {
                        if (result) {
                            const token = jwt.sign({
                                id: user._id,
                                admin: user.admin
                            }, process.env.KEY_SECURE_JWT, { expiresIn: '1d' });
                            res.status(200).json({ user: user, accessToken: token })
                        } else {
                            res.status(400).json({ message: 'Passwords do not match.' })
                        }
                    }
                });
            } else {
                res.status(400).json({ message: 'Email does not exist on the system' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Server have error' })
        })

}

exports.postSignup = async (req, res, next) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const hasPassword = await bcrypt.hash(password, 12)
        const userFind = await User.findOne({ email: email })
        if (userFind) {
            res.status(400).json({
                message: 'Email already exists on the system',
            })
        } else {
            const user = await User({ name: name, email: email, password: hasPassword })
            await user.save()
            res.status(201).json({
                message: 'User Created Successly!',
            })
        }

    } catch (error) {
        res.status(500).json({ message: 'Server have error' })
    }
}

// exports.postLogout = async (req, res, next) => {
//     try {
//         res.clearCookie('accessToken');
//         res.status(200).json({ message: 'Logout successful' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server have error' })
//     }
// }