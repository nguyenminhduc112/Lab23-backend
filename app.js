const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const fs = require('fs')
require('dotenv').config();
// Const
const URL_MONGODB = process.env.MONGODB_URL
// Import Router
const feedRouters = require('./routers/feed')
const authRouters = require('./routers/auth')
app.use(cookieParser());
// Fix Error CORS
app.use(cors())
// use helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// use morgan
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
)
app.use(morgan('combined', { stream: accessLogStream }))
// use asset compression
app.use(compression());
// Tăng giới hạn kích thước của body lên 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Static
app.use('/images', express.static(path.join(__dirname, 'images')));


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*') // Cấp quyền truy cập cho client (* là mọi client)
//     res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE') // Cấp quyền truy cập các http method
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type Authorization') // Cấp quyền set các header trên client
//     next()
// })

// Routers
app.use('/auth', authRouters)
app.use('/feed', feedRouters)

app.use((error, req, res, next) => {
    res.status(500).json(error)
})


mongoose.connect(URL_MONGODB)
    .then((result) => {
        console.log("MongoDB Connect")
        const server = app.listen(process.env.PORT_SERVER || 3001)
        const io = require('./config/socket').init(server)
        io.on('connection', socket => {
            console.log("Client connected")
        })
    })
    .catch(err => {
        throw new Error(err)
    })
