const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3
    },
     email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
     mobile: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
})

const User = mongoose.model("UserData", userSchema)
module.exports = User