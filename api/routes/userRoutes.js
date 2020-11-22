const express = require('express')
const router = express.Router()


const { UserValidator } = require('../validators')
const { UserController } = require('../controller');


// midlewwares
router.use(express.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));


// Auth
    // crear usuario
router.post('/app/user/register', UserValidator.register, UserController.register)

    // login de usuario
router.get('/app/user/login', UserValidator.login, UserController.login)


module.exports = router