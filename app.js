#!/usr/bin/env node

var createError = require('http-errors')
var express = require('express')
var morgan = require('morgan')
var path = require('path')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var config = require('./config.json')
var logger = require('./utils/logger')(config)
var Utility = require('./utils/utility')
var Manager = require('./manager/userManager')
var IndexRouter = require('./routes/index')
// var usersRouter = require('./routes/users')
var http = require('http')


class Application {
    constructor(config, logger, manager) {
        // Create App
        this.app = this.createApp(config, logger, manager)
        //Create HTTP server.
        this.server = this.createServer(config, logger, this.app)
    }

    createApp(config, logger, manager) {
        // create app
        let app = express()

        // view engine setup
        app.set('views', path.join(__dirname, 'views'))
        app.set('view engine', 'ejs')

        app.use(morgan('dev'));
        app.use(express.json())
        app.use(express.urlencoded({
            extended: false
        }))
        app.use(express.static(path.join(__dirname, 'public')))
        app.use(cookieParser('anhlt59'))

        //use sessions for tracking logins
        app.use(session(config.session))

        // set route
        let indexRouter = new IndexRouter(config, logger, manager)
        app.use('/', indexRouter.router)
        // app.use('/users', usersRouter)

        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            next(createError(404))
        })

        // error handler
        app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message
            res.locals.error = req.app.get('env') === 'development' ? err : {}

            // render the error page
            res.status(err.status || 500)
            res.render('error')
        })

        // Get port from environment and store in Express.
        app.set('port', config.port)
        return app
    }

    createServer(config, logger, app) {
        //Create HTTP server.
        let server = http.createServer(app)

        // Listen on provided port, on all network interfaces.
        server.listen(config.port)
        server.on('error', onError)
        server.on('listening', onListening)
        return server

        // Event listener for HTTP server "error" event.
        function onError(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }
            var bind = typeof port === 'string' ?
                'Pipe ' + port :
                'Port ' + port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    logger.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    logger.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }

        // Event listener for HTTP server "listening" event.
        function onListening() {
            let addr = server.address();
            let bind = typeof addr === 'string' ?
                'pipe ' + addr :
                'port ' + addr.port;
            logger.info('Server listening on ' + bind);
        }
    }
}


http.globalAgent.maxSockets = Infinity
// Get Utility.
var utility = new Utility(logger)
// Create manager.
var manager = new Manager(config, logger)
// manager.register({
//     "password": "1234567890",
//     "username": "anhlt62",
//     "email": "anhlt62@fpt.com.vn",
//     "gender": "male"
// }, (err, doc) => {
//     if (err) {
//         logger.error('this err', err)
//     } else {
//         logger.info(doc)
//     }
// })
// manager.getModel('tickets')
// Run
var application = new Application(config, logger, manager)