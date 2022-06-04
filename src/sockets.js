const Chat = require('./Models/chat')
const Message = require('./Models/message')

module.exports = function(io){
    let nikNames = [];

    io.on('connection', async (socket) => {
        console.log('New connection established');

        socket.on('new user', (data, cb)=>{
            cb(true);
            socket.user = data;
            updateMessages()
        })

        async function  updateMessages () {
            try{
                let messages = await Message.find({"id_chat": socket.user.id_chat})
                console.log(messages);
                io.sockets.emit('load messages', messages)
            }catch(e){
                console.log('Error', e);
            }
        }

        socket.on('send message', async (message) => {
            console.log('entro', message);
            await new Message({
                id_chat: socket.user.id_chat,
                nik: socket.user.name +' '+ socket.user.lastName ,
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