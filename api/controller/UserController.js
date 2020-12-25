const { UserService } = require('../services/')
const { comparedPassword, createToken } = require('../util')

module.exports = {

    register: async (req, res) => {        
        const { name, email, password, confirmPassword } = req.body
        const errors = {}
    
        try {
                        
            // verificar si existe el usuario 
            const userExist = await UserService.findUser(email)            
            if(userExist){
                errors.message = 'El correo ya está en uso'
                throw new Error('Authentication Error', errors)
            }

            // revisamos que la contraseña sea la misma 
            if(password !== confirmPassword){
                errors.message = 'La contraseña no es la misma'
                throw new Error('Input Error', errors)
            }

            // ya que todo esta bien creamos el usuario 
            const user = await UserService.create({ name, email, password })
            if(!user){
                errors.message = 'Error al crear el usuario'
                throw new Error('Input Error', errors)
            }
            res.status(200).json({ message: 'Usuario creado con exito'})

        } catch (error) {
            res.status(401).json({ message: errors })
        }
    }, 
    login: async (req, res) =>  {
        const { email, password } = req.body
        const errors = {}
        
        try {
           
            const user = await UserService.findUser(email)

            if(!user){
                errors.message = 'El usuario no existe'
                throw new Error('Authenticate Error', errors)
            }
            // revisamos la contraseña
            const isValidPassword = await comparedPassword(user.password, password)

            if(!isValidPassword){
                errors.message = 'Error en las credenciales'
                throw new Error('Input Error', errors)
            }

            const token = createToken(user)
            if(!token) throw new Error('Token Error')
            
            res.status(200).json({ message: 'Login Existoso',  login: token })

        } catch (error) {
            res.status(401).json({ message: 'Server error: ', errors })
        }
    },
    findById: async (req, res) => {
        const { id } =req.params
        try {
            const user = await UserService.findById(id)
            if(!user) throw new Error('Usuario no encontrado')
            res.status(200).json({ message: user })
        } catch (error) {
            res.status(400).json({ mesasge: error })
        }
    }
}