let io

module.exports = {
    init: httpServer => {
        const { Server } = require('socket.io');
        io = new Server(httpServer, {
            cors: {
                origin: 'https://lab23-frontend.onrender.com'
            }
        })
        return io
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized')
        }
        return io
    }
}