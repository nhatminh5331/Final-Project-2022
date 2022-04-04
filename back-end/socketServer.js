let users = [];

const SocketServer = socket => {
    // Connect and Disconnect Socket
    socket.on('johnUser', id => {
        users.push({id, socketID : socket.id})
        // console.log({users})
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketID !== socket.id)
        // console.log({users})
    })


    // Comment Socket
    socket.on('createComment', newPost => {
        // console.log(newPost)
        
        const ids = [newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
        // console.log(clients)

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketID}`).emit("createCommentToClient", newPost)
            })
        }
    })

    socket.on('deleteComment', newPost => {
        
        const ids = [newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketID}`).emit('deleteCommentToClient', newPost)
            })
        }

    })


    // Chat Socket
    socket.on("createChat", message => {
        // console.log(message)
        const user = users.find(user => user.id === message.recipient)
        user && socket.to(`${user.socketID}`).emit("createChatToClient", message)
    })
}

module.exports = SocketServer