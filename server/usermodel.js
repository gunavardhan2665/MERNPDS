const mongoose = require('mongoose')

const usermodel = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model('usermodel', usermodel)

module.exports = User;