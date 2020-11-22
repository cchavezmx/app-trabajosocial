const { NotasService } = require('../services')

module.exports = {
    register: async (req, res) => {
        const { nss } = req.body
        const errors = {}
        try {
            
            // verificamos si el nss ya esta registrado
            const nssExist = await NotasService.findNss(nss)      
            console.log(nssExist)
            if(nssExist){
                errors.nss = 'El NSS ya esta registrado'
                throw new Error('Input Error', errors)
            }

            // Si no esta esta el nsss creamos la nota
            const nota = await NotasService.create(req.body)
            if(!nota){
                errors.nota = 'Error al crear la nota'
                throw new Error('Input Error', errors)
            }
            res.status(200).json({ message: 'Nota creada', nota })
            
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: 'Error en la cracion de la nota', errors })
        }
    },
    addNota: async ( req, res ) => {
            const { nss } = req.params
            const errors = {}
        try {
            
            // traemos el documento 
            const user = await NotasService.findNss(nss)
            if(!user){
                errors.user = "No existen registros con ese numero de NSS"
                throw new Error('Input Error', errors)
            }
                        
            // Creamos la nota 
            const contenet = await NotasService.createContent(req.body)
            if(!contenet){
                errors.contenet = "Error en la creacion de la nota"
                throw new Error('Input Error', errors)
            }

            console.log(user.registros)
            // añadimos el nota al registro
            const registro = await NotasService.addNota(user, contenet)

            res.status(200).json({ message: 'Nuevo Registro añadido', registro})

        } catch (error) {
            res.status(401).json({ message: 'Error fatal', errors })
        }
    },
    getNotas: async (_, res) => {
        const errors = {}
        try {

            const docs = await NotasService.getNotas()
            if(!docs){
                error.message = 'Aun no hay notas guardadas'
                throw new Error('Ouput Error', errors)
            }
            res.status(200).json({ message: docs })
        } catch (error) {
            res.status(401).json({ message: 'Error fatal', errors })
        }
    },
    getNotasbyNss: async (req, res) => {
        const { nss } = req.params
        const errors = {}
        try {

            // buscar nota 
            const nota = await NotasService.findNss(nss)
            if(!nota){
                errors.message = `No hay notas con el NSS: ${nss}`
                throw new Error('Input', errors )
            }            
            res.status(200).json({ message: nota.registros })

        } catch (error) {
            res.status(401).json({ message: 'Error', errors })

        }
    }
}