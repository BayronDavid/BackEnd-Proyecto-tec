const Chat = require('./Models/chat')
const Message = require('./Models/message')
const moment = require('moment')

module.exports = function(io){

    io.on('connection', async (socket) => {
        console.log('New connection established');

        socket.on('new user', (data, cb)=>{
            cb(true);
            socket.user = data;
            updateMessages()
        })

        async function  updateMessages () {
            try{
                let messages = await Message.find({"id_travel": socket.user.id_travel})
                io.sockets.emit('load messages', messages)
            }catch(e){
                console.log('Error', e);
            }
        }

        socket.on('send message', async (message) => {
            await new Message({
                id_travel: socket.user.id_travel,
                nik: socket.user.name +' '+ socket.user.lastName ,
                message: message,
                media: null,
            }).save()

            updateMessages()
        })

        socket.on('disconnect', () =>{
            if(!socket.nickName) return;
        })
    })  
}