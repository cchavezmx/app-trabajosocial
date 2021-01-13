//  Registros esta dentro de notas
const assert = require('assert')
const { Pacientes , Registros } = require('../models')

module.exports = {
    findNss: (nss) =>  Pacientes.findOne({ nss }),
    create: (body) => new Pacientes(body).save(),
    createContent: (body) => new Registros(body).save(),
    addNota: (user, content) => {
        user.registros.push(content)
        user.save()
    },
    getNotas: () => Pacientes.find().exec(),
    findUserbyNss: (nss) => Pacientes.findOne({ nss }),
    // se crea la consulta y se espera en el controlador 
    findByQueryText: (text) => {
        const querySearch = Pacientes.aggregate().match(
            {
                  '$text': {
                    '$search': text
                  }
                
              },{}
        ).project( {
              'nombre': 1, 
              'nss': 1
            }
        )
        return querySearch
    }

}
