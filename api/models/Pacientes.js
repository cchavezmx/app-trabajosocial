const mongoose = require('mongoose')
const { Schema } = mongoose

const PacientesSchemas = new Schema({
    is_active: {
        type: Boolean,
        default: true
    },
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
    contacto: {
        type: String,
        trim: false,
    },
    // Se guarda unicamente el ObjectId 
    registros: [{
        registros_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'registros'
        }
    }],


}, { timestamps: true })

const Pacientes = mongoose.model('Pacientes', PacientesSchemas)

module.exports = {
    Pacientes
}