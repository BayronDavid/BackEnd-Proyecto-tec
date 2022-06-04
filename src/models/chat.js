const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChatSchema = new Schema({
    travel_id   : String,
    name        : String,
    type        : String,
    created_at: {
        type:    Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Chat', ChatSchema)