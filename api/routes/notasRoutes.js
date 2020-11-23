const express = require('express')
const router = express.Router()

const { NotasController } = require('../controller')
const { NotasValidator } = require('../validators')
const { verifyToken } =require('../context/authContext')

// midlewwares
router.use(express.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));



// nota "El campo unico es el NSS"
router.post('/app/notas/', verifyToken, NotasValidator.register, NotasController.register)
// añadir nota 
router.post('/app/notas/:nss', verifyToken, NotasValidator.addNota, NotasController.addNota)
// todas las notas sin registros
router.get('/app/notas/', verifyToken, NotasController.getNotas)
// todos los gistros por nota
router.get('/app/notas/:nss', verifyToken, NotasValidator.getNotasbyNss, NotasController.getNotasbyNss)
// crear, modificar y borrar 
module.exports = router




// TODO // Update de notas