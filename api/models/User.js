const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
 
const { Schema } = mongoose

const userSchema = new Schema({
    rol: {
        type: String,
        default: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true }
)

userSchema.pre('save', function(next){
    const SALT = 10;
    const name = this

    if(!name.isModified('password')) return next()

    return bcrypt.hash(name.password, SALT, function(err, hash){
        if(err) throw new Error('bcrypt error', err)
        name.password = hash
        return next()

    })
})


const User = mongoose.model('Users', userSchema)

module.exports = {
    User
}