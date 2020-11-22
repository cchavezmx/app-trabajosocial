const express = require('express')
const router = express.Router()

const { NotasController } = require('../controller')

// midlewwares
router.use(express.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));



// Crear nota "El campo unico es el NSS"
router.post('/app/notas/', NotasController.register)

// añadir nota 
router.post('/app/notas/:nss', NotasController.addNota)

// TODO // Update de notas

// todas las notas sin registros
router.get('/app/notas/', NotasController.getNotas)

// todos los gistros por nota
router.get('/app/notas/:nss', NotasController.getNotasbyNss)

// crear, modificar y borrar 
module.exports = router