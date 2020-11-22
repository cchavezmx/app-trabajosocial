const mongoose = require('mongoose')

const { Schema } = mongoose

const registrosSchema = new Schema({
    content: {
        type: String,
        required: true,
    }

}, {timestamps: true})


const Registros = mongoose.model('Registros', registrosSchema)


module.exports = {
    Registros, registrosSchema
}