const express = require('express')
const router = express.Router()


const { UserValidator } = require('../validators')
const { UserController } = require('../controller');
const { verifyToken } =require('../context/authContext')

// midlewwares
router.use(express.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));




// crear usuario
router.post('/app/user/register', UserValidator.register, UserController.register)

// login de usuario
router.post('/app/user/login', UserValidator.login, UserController.login)

// Auth
// TODO CREAR UN USUARIO QUE NECESITE VERIFICAR EL TOKEN
router.get('/app/user/:id', verifyToken, UserValidator.findById, UserController.findById )

module.exports = router