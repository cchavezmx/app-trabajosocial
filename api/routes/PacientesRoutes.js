const express = require('express')
const router = express.Router()

const { PacientesController } = require('../controller')
const { PacientesValidator } = require('../validators')


// midlewwares
router.use(express.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));



// nota "El campo unico es el NSS"
router.post('/app/pacientes/register', /*verifyToken ,*/ PacientesValidator.register, PacientesController.register)
// añadir nota 
router.post('/app/pacientes/add/:nss', /*verifyToken, */ PacientesValidator.addNota, PacientesController.addNota)

// todas las notas sin registros
router.get('/app/pacientes/', /*verifyToken, */ PacientesController.getNotas)

// solo notas por nss 
router.get('/app/pacientes/:nss', /* verifyToken, */ PacientesValidator.getNotasbyNss, PacientesController.getNotasbyNss)

// por nss del paciente
router.get('/app/paciente/:nss', /*verifyToken, */ PacientesController.findUserbyNss)

// buscador por palabra
// TODO: incluir en el modelo un buscador de texto https://mongoosejs.com/docs/api.html#aggregate_Aggregate-search
router.get('/app/search/', /*verifyToken */  PacientesController.findByQueryText)

module.exports = router

// TODO crear, modificar y borrar 
// TODO faltan los validadores