const mongoose = require('mongoose');
const {Schema} = mongoose;

const MessageSchema = new Schema({
    id_chat     : String,
    nik         : String,
    message     : String,
    media       : String,

    created_at: {
        type    : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Message', MessageSchema)
