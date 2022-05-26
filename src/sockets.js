module.exports = function(io){
    io.on('connection', (socket) => {
        console.log('New connection established');

        socket.on('send message', (data) => {
            io.sockets.emit('new message', data)
        })
    
        socket.on('disconnect', () =>{
            console.log('User disconnected');
        })
    })  
}