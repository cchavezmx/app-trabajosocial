const { celebrate, Joi, Segments } = require('celebrate')


module.exports = {

    register: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        })
    }),
    login: celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        })
    })

}