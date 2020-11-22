require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const { MONGO_URI } = require('./api/config')
const app = express()
const PORT = process.env.PORT || 3000

// MIDDLEWARES
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

// conexión con mongoose
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() =>  console.log('Conectado a la base de datos'))
    .catch((err) => console.log(`Error en la conexion de la base de datos ${err}`))

// encendido 
app.use(require('./api/routes'))
app.listen(PORT, () => console.log('Express conectado y escuchando en el puerto: ', PORT ))


