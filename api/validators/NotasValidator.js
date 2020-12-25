const { celebrate, Joi, Segments } = require('celebrate')

module.exports = {

    register: celebrate({ 
        [Segments.BODY]:Joi.object().keys({
            nss: Joi.string().required(),
            nombre: Joi.string().required(),
        })
    }),
    addNota: celebrate({
        [Segments.PARAMS]:Joi.object().keys({
            nss: Joi.string().required()
        })
    }),
    getNotasbyNss: celebrate({
        [Segments.PARAMS]:Joi.object().keys({
            nss: Joi.string().required()
        })
    }),

}