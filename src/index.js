const http      = require('http');
const path      = require('path');
const express   = require('express');
const {Server}  = require('socket.io');
var bodyParser  = require('body-parser');

const  { engine } = require( 'express-handlebars');

var cors        = require('cors');
const Chat      = require('./Models/chat.js')
const User      = require('./Models/user.js')

var mongoose = require('mongoose');

require('../config/dbConnection.js') // MongoDb connection

const app       = express();
app.use(cors());
const server    = http.createServer(app);
const io        = new Server(server);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "10mb"}));

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
   }));

app.set('view engine', '.hbs');


require('./sockets')(io)

app.get('/', function (req, res) {
    res.render('index', {test: 'test hbs'})
})
app.get('/a', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.get('/getChats', async function (req, res) {
    let chats = await Chat.find({})
    res.send(chats)
})

app.get('/getChat/:id_chat', async function (req, res) {
    try {
        var id = mongoose.Types.ObjectId(req.params.id_chat);
        let chats = await Chat.findById(id)
        res.send(chats)
    }catch (err) {
        res.send('error')
    }
})

app.get('/getChatByTravelId/:travel_id/:type', async function (req, res) {
    let chat = await Chat.find({
        'travel_id': req.params.travel_id,
        "type": req.params.type
    })
    res.send(chat)
})
app.get('/getUser/:id_user/:id_reservation', async function (req, res) {
    let user = await User.find({
        'id_user': req.params.id_user,
        "id_reservation": req.params.id_reservation
    })
    await res.render('index', {encodedJson : encodeURIComponent(JSON.stringify(user))})
})
app.get('/getUsersByChat/:id_chat', async function (req, res) {
    let users = await User.find({
        'id_chat': req.params.id_chat
    })
    res.send(users)
})

app.post('/createChat', async function (req, res) {
    await new Chat({
        id_user         : req.body.id_user,
        username        : req.body.username,
        name            : req.body.name,
        lastName        : req.body.lastName,
        gender          : req.body.gender,
        typeAccount     : req.body.typeAccount,
        id_chat         : req.body.id_chat,
    }).save()
    res.send(req.body)
})
app.post('/addUser', async function (req, res) {
    await new User({
        id_user: req.body.id_user,
        travel_id: req.body.travel_id,
        username: req.body.username,
        name : req.body.name,
        lastName: req.body.lastName,
        gender: req.body.gender,
        typeAccount : req.body.typeAccount,
        id_chat: req.body.id_chat,
        id_reservation  : req.body.id_reservation,
    }).save()
    res.send(req.body)
})

server.listen(app.get('port'), ()=>{
    console.log(`Server listening on http://localhost:${app.get('port')}`);
})