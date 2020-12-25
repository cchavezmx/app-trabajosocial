const mongoose = require('mongoose')
const { Schema } = mongoose
const { registrosSchema } = require('../models/Registros')


const NotasSchemas = new Schema({
    nss: {
        type:String,
        unique: true,
        required: true
    },
    nombre: {
        type:String,
        required: true
    },
    curp: {
        type:String,
        required:false,
    },
    unidad: {
        type:String,
        required:false,
    },
    consultorio: {
        type: String,
        required: false,
    },
    turno: {
        type: String,
        required: false,
    },
    edad: {
        type: Number,
        required: false,
        trim: true
    },
    sexo: {
        type: String,
        required: false,
        trim: true
    },
    phone: {
        type: String,
        trim: false,
    },
    registros: [registrosSchema],


}, { timestamps: true })

const Notas = mongoose.model('Notas', NotasSchemas)

module.exports = {
    Notas
}