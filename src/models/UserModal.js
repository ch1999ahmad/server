const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city:{type:String, required:true},
    avatar: { type: String, default: "" },
    clientID: { type: String, default: "" },
})

const Modal = new mongoose.model('USER', UserSchema)

module.exports = Modal