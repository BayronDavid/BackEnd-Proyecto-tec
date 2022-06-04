const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    id_user:    String,
    username:   String,
    name:       String,
    lastName:   String,
    gender:     String,
    typeAccount:String,
    id_chat:    String,
    id_reservation : String,
})

module.exports = mongoose.model('User', UserSchema)