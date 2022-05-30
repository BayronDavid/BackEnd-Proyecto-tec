const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChatSchema = new Schema({
    users : String,
    created_at: {
        type:    Date,
        default: Date.now()
    },
    updated_at: {
        type:    Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Chat', ChatSchema)