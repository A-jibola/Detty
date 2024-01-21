const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    saves:{
        type: [ObjectId]
    }
})

module.exports = mongoose.model('Users', userSchema);