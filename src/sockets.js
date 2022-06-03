const Chat = require('./Models/chat')
const Message = require('./Models/message')

module.exports = function(io){
    let nikNames = [];

    io.on('connection', async (socket) => {
        console.log('New connection established');
        // await new Chat({
        //     users: 'Bayron, Andres'
        // }).save()

        socket.on('new user', (data, cb)=>{
            console.log(data);
            cb(true);
            socket.nickName = data;
            nikNames.push(socket.nickName);
            io.sockets.emit('users', nikNames)

        })

        async function  updateMessages () {
            let messages = await Message.find({})
            await io.sockets.emit('load messages', messages)
        }
        updateMessages()

        socket.on('send message', async (message) => {
            console.log('entro', message);
            io.sockets.emit('new message', {message, user: socket.nickName})
            await new Message({
                chat_id: 1,
                nik: socket.nickName,
                message: message,
                media: null,
            }).save()

            updateMessages()
        })



        socket.on('disconnect', () =>{
            if(!socket.nickName) return;
            // nickNames.splice(nickNames.indexOf(socket.nickName), 1)
            // io.sockets.emit('users', nikNames)
        })

    })  
}