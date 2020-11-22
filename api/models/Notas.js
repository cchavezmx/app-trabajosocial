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
        required:true
    },
    unidad: {
        type:String,
        required:true
    },
    consultorio: {
        type: String,
        required: true,
    },
    turno: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true,
        trim: true
    },
    sexo: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    registros: [registrosSchema],


}, { timestamps: true })

const Notas = mongoose.model('Notas', NotasSchemas)

module.exports = {
    Notas
}