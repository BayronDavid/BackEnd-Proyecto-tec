const http      = require('http');
const path      = require('path');
const express   = require('express');
const {Server}  = require('socket.io');
const mongoose  = require('mongoose');

const app       = express();
const server    = http.createServer(app);
const io        = new Server(server);

mongoose.connect('mongodb://localhost/test').then(
    db => console.log('db is connected')
    ).catch(
        e => console.log(e)
    );


app.set('port', process.env.PORT || 3000)
require('./sockets')(io)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

server.listen(app.get('port'), ()=>{
    console.log(`Server listening on http://localhost:${app.get('port')}`);
})