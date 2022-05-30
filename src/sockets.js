const Chat = require('./models/chat')
const Message = require('./models/message')

module.exports = function(io){
    io.on('connection', async (socket) => {
        console.log('New connection established');
        // await new Chat({
        //     users: 'Bayron, Andres'
        // }).save()

        let messages = await Message.find({})

        await io.sockets.emit('load messages', messages)

        socket.on('send message', async (data) => {
            io.sockets.emit('new message', data)
            await new Message({
                chat_id: 1,
                nik: 'Bayron',
                message: data,
                media: null,
            }).save()
        })

        socket.on('disconnect', () =>{
            console.log('User disconnected');
        })
    })  
}