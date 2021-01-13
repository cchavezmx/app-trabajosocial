const { celebrate, Joi, Segments } = require('celebrate')

module.exports = {

    register: celebrate({ 
        [Segments.BODY]:Joi.object().keys({
            nss: Joi.string().required(),
            nombre: Joi.string().required(),
            curp: Joi.string().empty().optional().allow(''),
            unidad: Joi.string().empty().optional().allow(''),
            consultorio: Joi.string().empty().optional().allow(''),
            turno: Joi.string().empty().optional().allow(''),
            edad: Joi.string().empty().optional().allow(''),
            sexo: Joi.string().empty().optional().allow(''),
            contacto: Joi.string().empty().optional().allow(''),
        })
    }),
    addNota: celebrate({
        [Segments.PARAMS]:Joi.object().keys({
            nss: Joi.string().required(),
        })
    }),
    getNotasbyNss: celebrate({
        [Segments.PARAMS]:Joi.object().keys({
            nss: Joi.string().required()
        })
    })

}