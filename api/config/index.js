const NODE_ENV = process.env.NODE_ENV || 'test'

const config = {
    test: {
        MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.oemvf.azure.mongodb.net/trabajosocial?retryWrites=true&w=majority`            
    }
}

module.exports = config[NODE_ENV]