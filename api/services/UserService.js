const { User } = require('../models')

module.exports = {
    findUser: (email) => User.findOne({ email }),
    create: (payload) => new User(payload).save()
}