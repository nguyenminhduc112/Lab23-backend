const fs = require('fs')

exports.deleteFile = (pathFile) => {
    fs.unlink(pathFile, (err) => {
        if (err) {
            throw (err)
        }
    })
}