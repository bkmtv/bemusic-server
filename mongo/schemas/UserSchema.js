const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    isAdmin: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    }
})

module.exports = mongoose.model("Users", UserSchema)