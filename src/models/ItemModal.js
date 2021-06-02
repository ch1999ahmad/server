const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name:{type: String, required: true, },
    categoryID:{type: String, required: true, },
    description:{type: String, required: true, },
    image:{type: Array, default:[] },
    price:{type: Number, required: true, },

})

const Modal = new mongoose.model('ITEM', ItemSchema)

module.exports = Modal