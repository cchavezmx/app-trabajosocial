const { PacientesService } = require('../services')

module.exports = {
    register: async (req, res) => {
        const { nss } = req.body
        const errors = {}
        try {
            
            // verificamos si el nss ya esta registrado
            const nssExist = await PacientesService.findNss(nss)      
            console.log(nssExist)
            if(nssExist){
                errors.nss = 'El NSS ya esta registrado'
                throw new Error('Input Error', errors)
            }

            // Si no esta esta el nsss creamos la nota
            const paciente = await PacientesService.create(req.body)
            console.log(paciente)
            if(!paciente){
                errors.nota = 'Error al crear la nota'
                throw new Error('Input Error', errors)
            }
            res.status(200).json({ message: paciente })
            
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Error en la creación de la nota', errors })
        }
    },
    addNota: async ( req, res ) => {
            const { nss } = req.params
            const errors = {}
        try {
            
            // traemos el documento 
            const user = await PacientesService.findNss(nss)
            if(!user){
                errors.user = "No existen registros con ese numero de NSS"
                throw new Error('Input Error', errors)
            }
                        
            // Creamos la nota 
            const contenet = await PacientesService.createContent(req.body)
            if(!contenet){
                errors.contenet = "Error en la creacion de la nota"
                throw new Error('Input Error', errors)
            }

            // añadimos el nota al registro
            const registro = await PacientesService.addNota(user, contenet)

            res.status(200).json({ message: 'Nuevo Registro añadido', registro})

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getNotas: async (_, res) => {
        const errors = {}
        try {

            const docs = await PacientesService.getNotas()
            if(!docs){
                error.message = 'Aún no hay notas guardadas'
                throw new Error('Ouput Error', errors)
            }
            res.status(200).json({ message: docs })
        } catch (error) {
            res.status(400).json({ message: 'Error fatal', errors })
        }
    },
    getNotasbyNss: async (req, res) => {
        const { nss } = req.params
        const errors = {}
        try {

            // buscar nota 
            const nota = await PacientesService.findNss(nss)
            if(!nota){
                errors.message = `No hay notas con el NSS: ${nss}`
                throw new Error('Input', errors )
            }            
            res.status(200).json({ message: nota.registros })

        } catch (error) {
            res.status(400).json({ message: 'Error', errors })

        }
    },
    findUserbyNss: async (req, res) => {
        const { nss } = req.params
        try {
            const user = await PacientesService.findUserbyNss(nss)
            res.status(200).json({ user })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    findByQueryText: async(req, res) => {
        
        const { text } = req.query

        try {
            const queryText = await PacientesService.findByQueryText(text)
            if(queryText)
            res.status(200).json({ message: queryText })
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }
}