let mongoose = require('mongoose')

let users = require('./schema/user')
let tickets = require('./schema/ticket')
let Models = {
    users,
    tickets
}

module.exports = class Database {
    constructor(config, logger) {
        this.config = config.database
        this.logger = logger

        // Create connection
        this.connection = mongoose.createConnection(
            this.config.connection,
            this.config.options
        )

        // Event
        this.connection.on('connected', () => {
            logger.info(`Database connected to ${this.config.connection}`)
        })
        this.connection.on('error', err => {
            logger.error(`Database ${this.config.connection} error: ${err}`)
        })
        this.connection.on('disconnected', () => {
            logger.error(`Database ${this.config.connection} is disconnected`)
        })
    }

    // Get Model
    getModel(model) {
        if (Models.hasOwnProperty(model)) {
            return this.connection.model(model, Models[model])
        } else {
            throw new Error(`Model ${model} is not exist`)
        }
    }
}