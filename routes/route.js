let express = require('express')


module.exports = class Router {
    constructor(config, logger, manager) {
        this.router = express.Router()
        this.config = config
        this.logger = logger
        this.manager = manager
    }

    // If user is not logged redirect to login page
    requireLogin(req, res, next) {
        if (!req.session) {
            res.redirect('/login')
        } else {
            next()
        }
    }
}