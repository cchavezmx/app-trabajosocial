const express = require('express')
const router = express.Router()

const { NotasController } = require('../controller')
const { NotasValidator } = require('../validators')
const { verifyToken } =require('../context/authContext')

// midlewwares
router.use(express.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));



// nota "El campo unico es el NSS"
router.post('/app/notas/register', /*verifyToken ,*/ NotasValidator.register, NotasController.register)
// añadir nota 
router.post('/app/notas/add/:nss', /*verifyToken, */ NotasValidator.addNota, NotasController.addNota)

// todas las notas sin registros
router.get('/app/pacientes/', /*verifyToken, */ NotasController.getNotas)

// solo notas por nss 
router.get('/app/notas/:nss', /* verifyToken, */ NotasValidator.getNotasbyNss, NotasController.getNotasbyNss)


router.get('/app/paciente/:nss', /*verifyToken, */ NotasController.findUserbyNss)

module.exports = router

// TODO crear, modificar y borrar 
// TODO faltan los validadores