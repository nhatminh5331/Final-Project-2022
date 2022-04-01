let users = []

const SocketServer = (socket) => {
    // Connect and Disconnect Socket
    socket.on('johnUser', id => {
        users.push({id, socketID : socket.id})
        // console.log({users})
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketID !== socket.id)
        // console.log({users})
    })
    // 
}

module.exports = SocketServer