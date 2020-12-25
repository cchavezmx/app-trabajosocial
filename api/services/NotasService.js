//  Registros esta dentro de notas
const { Notas, Registros } = require('../models')

module.exports = {
    findNss: (nss) =>  Notas.findOne({ nss }),
    create: (body) => new Notas(body).save(),
    createContent: (body) => new Registros(body).save(),
    addNota: (user, content) => {
        user.registros.push(content)
        user.save()
    },
    getNotas: () => Notas.find().exec(),
    findUserbyNss: (nss) => Notas.findOne({ nss })




}
